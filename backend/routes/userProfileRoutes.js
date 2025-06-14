import express from 'express';
import verifyFirebaseToken from '../middlewares/verifyFirebaseToken.js';
import { getUserProfile, updateUserProfile } from '../controllers/userProfileController.js';

const router = express.Router();

// Apply Firebase token verification to all routes
router.use(verifyFirebaseToken);

// GET /api/user-profile - Get user profile
router.get('/', getUserProfile);

// PUT /api/user-profile - Create or update user profile
router.put('/', updateUserProfile);

export default router;
