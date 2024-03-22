import express from 'express';
import { getUserListings, test } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Parse JSON request bodies
// router.use(express.json());

// Define the test route handler
router.get('/test', test);
// router.post('/update/:id', updateUser)

router.get('/listings/:id', verifyToken, getUserListings);

export default router; 