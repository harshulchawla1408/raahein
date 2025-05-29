require("dotenv").config();
const axios = require("axios");
const logger = require('../config/logger');

// Maximum number of retries for API calls
const MAX_RETRIES = 2;
// Timeout for API requests in milliseconds
const API_TIMEOUT = 30000;

// System prompt template
const SYSTEM_PROMPT = `You are a knowledgeable travel assistant that provides personalized travel destination recommendations. 
Your response must be a valid JSON array of exactly 3 destination objects. Each object must have these exact fields:
- name: String (destination name)
- description: String (detailed description, 2-3 sentences)
- estimatedCost: Number (in INR, within the user's budget range)
- duration: String (e.g., "5 days", "1 week")
- bestTimeToVisit: String (e.g., "October to March")
- activities: Array of strings (3-5 activities)

Format your response as a JSON array only, with no additional text or markdown.`;

/**
 * Get AI-generated travel destination suggestions using Gemini API
 * @param {Object} input - User input parameters
 * @returns {Promise<Array>} Array of destination objects
 */
exports.getGeminiResponse = async (input) => {
  const { age, groupType, interests, budget, duration, season, locationPreference } = input;
  
  // Construct the user prompt
  const userPrompt = `I'm a ${age}-year-old planning a ${duration} ${groupType} trip during ${season}. 
My interests are: ${interests.join(", ")}.
My budget is between ₹${budget.min} and ₹${budget.max}.
I prefer ${locationPreference} destinations.

Please suggest 3 destinations that would be a good fit.`;

  const requestData = {
    contents: [
      {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }]
      },
      {
        role: "model",
        parts: [{ text: "I understand. Please provide your travel preferences and I'll suggest 3 destinations in JSON format." }]
      },
      {
        role: "user",
        parts: [{ text: userPrompt }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_ONLY_HIGH"
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_ONLY_HIGH"
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_ONLY_HIGH"
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_ONLY_HIGH"
      }
    ]
  };

  let attempt = 0;
  let lastError;

  while (attempt < MAX_RETRIES) {
    try {
      attempt++;
      
      const response = await axios({
        method: 'post',
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        data: requestData,
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: API_TIMEOUT,
      });

      const rawText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!rawText) {
        throw new Error('Empty response from Gemini API');
      }

      const destinations = parseAndValidateResponse(rawText);
      
      // Ensure we have exactly 3 destinations
      if (destinations.length !== 3) {
        throw new Error(`Expected 3 destinations, got ${destinations.length}`);
      }
      
      return destinations;
      
    } catch (error) {
      lastError = error;
      logger.warn(`Attempt ${attempt} failed: ${error.message}`);
      
      // If it's not the last attempt, wait before retrying
      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // Exponential backoff
        continue;
      }
    }
  }

  // If we get here, all attempts failed
  throw lastError || new Error('Failed to get response from Gemini API');
};

/**
 * Parse and validate the raw text response from Gemini API
 * @param {string} rawText - Raw text response from Gemini
 * @returns {Array} Parsed and validated array of destination objects
 */
function parseAndValidateResponse(rawText) {
  try {
    // Extract JSON from markdown code blocks if present
    let jsonText = rawText;
    const jsonMatch = rawText.match(/```(?:json)?\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      jsonText = jsonMatch[1];
    }
    
    // Parse the JSON
    const destinations = JSON.parse(jsonText);
    
    if (!Array.isArray(destinations)) {
      throw new Error('Response is not an array');
    }
    
    // Validate each destination
    return destinations.map((dest, index) => {
      if (!dest.name || typeof dest.name !== 'string') {
        throw new Error(`Destination ${index + 1} is missing or has an invalid name`);
      }
      
      if (!dest.description || typeof dest.description !== 'string') {
        throw new Error(`Destination ${index + 1} is missing or has an invalid description`);
      }
      
      if (typeof dest.estimatedCost !== 'number' || dest.estimatedCost <= 0) {
        throw new Error(`Destination ${index + 1} has an invalid estimatedCost`);
      }
      
      if (!dest.duration || typeof dest.duration !== 'string') {
        throw new Error(`Destination ${index + 1} is missing or has an invalid duration`);
      }
      
      // Add default values for optional fields
      return {
        name: dest.name.trim(),
        description: dest.description.trim(),
        estimatedCost: Math.round(dest.estimatedCost),
        duration: dest.duration.trim(),
        bestTimeToVisit: dest.bestTimeToVisit || 'Year-round',
        activities: Array.isArray(dest.activities) ? dest.activities : []
      };
    });
    
  } catch (error) {
    logger.error('Failed to parse AI response', { error: error.message, rawText });
    throw new Error(`Invalid response format from AI: ${error.message}`);
  }
}
