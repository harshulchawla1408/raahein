import { getGeminiResponse } from '../utilis/aiHelper.js';
import AiSuggestion from '../models/AiSuggestion.js';
import logger from '../config/logger.js';

/**
 * @route   POST /api/ai/suggest-destinations
 * @desc    Get AI-generated travel destination suggestions
 * @access  Private
 * @param   {Object} req - Express request object
 * @param   {Object} req.body - User preferences for travel suggestions
 * @param   {string} req.user.uid - Firebase UID of the authenticated user
 * @returns {Array} Array of suggested destinations
 */
export const recommendDestinations = async (req, res) => {
  const userId = req.user?.uid || 'guest';
  const userInput = req.body;
  const requestId = Date.now().toString(36) + Math.random().toString(36).substr(2);

  logger.info(`[${requestId}] New destination suggestion request from user: ${userId}`, {
    input: userInput
  });

  try {
    // Get AI response
    const aiResult = await getGeminiResponse(userInput);
    
    if (!aiResult || !Array.isArray(aiResult) || aiResult.length === 0) {
      throw new Error('Invalid response format from AI service');
    }

    logger.info(`[${requestId}] Successfully generated ${aiResult.length} destination suggestions`);

    // Save to database (non-blocking)
    try {
      await AiSuggestion.create({
        userId,
        ...userInput,
        aiResponse: aiResult,
        requestId
      });
      logger.debug(`[${requestId}] Saved suggestion to database`);
    } catch (dbError) {
      logger.error(`[${requestId}] Error saving to database: ${dbError.message}`, {
        error: dbError
      });
    }

    res.status(200).json({
      success: true,
      data: aiResult,
      requestId
    });

  } catch (error) {
    const errorMessage = error.response?.data?.error?.message || error.message || 'AI service error';
    const statusCode = error.response?.status || 500;
    
    logger.error(`[${requestId}] AI suggestion failed: ${errorMessage}`, {
      error: error.message,
      stack: error.stack,
      statusCode
    });

    res.status(statusCode).json({
      success: false,
      error: 'Failed to generate travel suggestions',
      details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      requestId
    });
  }
};
