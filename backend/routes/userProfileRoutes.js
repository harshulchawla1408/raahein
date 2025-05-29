const express = require('express');
const router = express.Router();
const verifyFirebaseToken = require('../middlewares/verifyFirebaseToken');
const { getUserProfile, updateUserProfile } = require('../controllers/userProfileController');

// Apply Firebase token verification to all routes
router.use(verifyFirebaseToken);

// GET /api/user-profile - Get user profile
router.get('/', getUserProfile);

// PUT /api/user-profile - Create or update user profile
router.put('/', updateUserProfile);

module.exports = router;
