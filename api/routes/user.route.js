import express from 'express';
import { test } from '../controllers/user.controller.js';

const router = express.Router();

// Parse JSON request bodies
// router.use(express.json());

// Define the test route handler
router.get('/test', test);

export default router; 