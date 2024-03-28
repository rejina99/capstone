import express from 'express';
import { getUserListings, test, updateUser, deleteUser, getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


const router = express.Router();

// Parse JSON request bodies
// router.use(express.json());

// Define the test route handler
router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id', verifyToken, getUserListings);
router.get('/:id', verifyToken, getUser);
// router.get('/listings/:id', verifyToken, getUserListings);

export default router; 