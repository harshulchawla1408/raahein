import express from 'express';
import verifyFirebaseToken from '../middlewares/verifyFirebaseToken.js';
import { createOrUpdateUser } from '../controllers/userController.js';

const router = express.Router();

// POST /api/user - Create or update user from Firebase token
router.post('/user', verifyFirebaseToken, createOrUpdateUser);

export default router;
