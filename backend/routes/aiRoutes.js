const express = require('express');
const router = express.Router();
const { recommendDestinations } = require('../controllers/aiController');
const verifyFirebaseToken = require('../middlewares/verifyFirebaseToken');
const { body, validationResult } = require('express-validator');
const logger = require('../config/logger');

/**
 * @swagger
 * tags:
 *   name: AI
 *   description: AI-powered travel destination suggestions
 */

// Input validation middleware
const validateInput = [
  body('age')
    .isInt({ min: 1, max: 120 })
    .withMessage('Age must be between 1 and 120'),
  
  body('groupType')
    .isIn(['solo', 'couple', 'family', 'friends'])
    .withMessage('Invalid group type. Must be one of: solo, couple, family, friends'),
  
  body('interests')
    .isArray({ min: 1, max: 10 })
    .withMessage('At least one interest is required (max 10)'),
  
  body('budget')
    .isObject()
    .withMessage('Budget must be an object with min and max values'),
  
  body('budget.min')
    .isInt({ min: 0 })
    .withMessage('Minimum budget must be a positive number'),
  
  body('budget.max')
    .isInt({ min: 1 })
    .withMessage('Maximum budget must be a positive number'),
  
  body('duration')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Duration is required'),
  
  body('season')
    .isString()
    .trim()
    .notEmpty()
    .withMessage('Season is required'),
  
  body('locationPreference')
    .isIn(['domestic', 'international', 'any'])
    .withMessage('Invalid location preference. Must be one of: domestic, international, any'),
  
  // Custom validation for budget range
  (req, res, next) => {
    if (req.body.budget && req.body.budget.min > req.body.budget.max) {
      return res.status(400).json({
        status: 'fail',
        message: 'Minimum budget cannot be greater than maximum budget'
      });
    }
    next();
  },
  
  // Handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Validation failed', { errors: errors.array() });
      return res.status(400).json({
        status: 'fail',
        message: 'Validation Error',
        errors: errors.array()
      });
    }
    next();
  }
];

/**
 * @swagger
 * /api/v1/ai/suggest-destinations:
 *   post:
 *     summary: Get AI-generated travel destination suggestions
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - age
 *               - groupType
 *               - interests
 *               - budget
 *               - duration
 *               - season
 *               - locationPreference
 *             properties:
 *               age:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 120
 *                 example: 28
 *               groupType:
 *                 type: string
 *                 enum: [solo, couple, family, friends]
 *                 example: "couple"
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["beaches", "hiking", "food"]
 *               budget:
 *                 type: object
 *                 required:
 *                   - min
 *                   - max
 *                 properties:
 *                   min:
 *                     type: integer
 *                     minimum: 0
 *                     example: 10000
 *                   max:
 *                     type: integer
 *                     minimum: 1
 *                     example: 50000
 *               duration:
 *                 type: string
 *                 example: "7 days"
 *               season:
 *                 type: string
 *                 example: "summer"
 *               locationPreference:
 *                 type: string
 *                 enum: [domestic, international, any]
 *                 example: "domestic"
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Destination'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post(
  '/suggest-destinations',
  verifyFirebaseToken,
  validateInput,
  recommendDestinations
);

module.exports = router;
