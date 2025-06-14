import dotenv from 'dotenv';
import axios from 'axios';
import logger from '../config/logger.js';

dotenv.config();

const MAX_RETRIES = 2;
const API_TIMEOUT = 30000;
const GEMINI_URL = process.env.GEMINI_API_URL || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

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
export async function getGeminiResponse(input) {
  const { age, groupType, interests, budget, duration, season, locationPreference } = input;

  const userPrompt = `I'm a ${age}-year-old planning a ${duration} ${groupType} trip during ${season}. 
My interests are: ${interests.join(", ")}.
My budget is between ₹${budget.min} and ₹${budget.max}.
I prefer ${locationPreference} destinations.

Please suggest 3 destinations that would be a good fit.`;

  const requestData = {
    contents: [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "I understand. Please provide your travel preferences and I'll suggest 3 destinations in JSON format." }] },
      { role: "user", parts: [{ text: userPrompt }] }
    ],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
    ]
  };

  let attempt = 0;
  let lastError;

  while (attempt < MAX_RETRIES) {
    try {
      attempt++;

      const response = await axios.post(
        `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`, requestData,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: API_TIMEOUT,
        }
      );

      const rawText = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error('Empty response from Gemini API');

      const destinations = parseAndValidateResponse(rawText);
      if (destinations.length !== 3) {
        throw new Error(`Expected 3 destinations, got ${destinations.length}`);
      }

      return destinations;

    } catch (error) {
      lastError = error;
      logger.warn(`Gemini attempt ${attempt} failed: ${error.message}`);

      if (attempt < MAX_RETRIES) {
        await new Promise(res => setTimeout(res, 1000 * attempt));
      }
    }
  }

  throw lastError || new Error('Failed to get response from Gemini API');
}

/**
 * Parse and validate the raw text response from Gemini API
 * @param {string} rawText - Raw text response from Gemini
 * @returns {Array} Parsed and validated array of destination objects
 */
function parseAndValidateResponse(rawText) {
  try {
    let jsonText = rawText;
    const match = rawText.match(/```(?:json)?\n([\s\S]*?)\n```/);
    if (match?.[1]) jsonText = match[1];

    const destinations = JSON.parse(jsonText);

    if (!Array.isArray(destinations)) throw new Error('Response is not an array');

    return destinations.map((dest, idx) => {
      if (!dest.name || typeof dest.name !== 'string') throw new Error(`Destination ${idx + 1} has invalid name`);
      if (!dest.description || typeof dest.description !== 'string') throw new Error(`Destination ${idx + 1} has invalid description`);
      if (typeof dest.estimatedCost !== 'number' || dest.estimatedCost <= 0) throw new Error(`Destination ${idx + 1} has invalid estimatedCost`);
      if (!dest.duration || typeof dest.duration !== 'string') throw new Error(`Destination ${idx + 1} has invalid duration`);

      return {
        name: dest.name.trim(),
        description: dest.description.trim(),
        estimatedCost: Math.round(dest.estimatedCost),
        duration: dest.duration.trim(),
        bestTimeToVisit: dest.bestTimeToVisit || 'Year-round',
        activities: Array.isArray(dest.activities) ? dest.activities : []
      };
    });

  } catch (err) {
    logger.error('Failed to parse AI response', { error: err.message, rawText });
    throw new Error(`Invalid response format from AI: ${err.message}`);
  }
}
