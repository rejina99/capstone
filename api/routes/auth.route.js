import express from 'express'
import { google, signup } from '../controllers/auth.controller.js'
import { signin } from '../controllers/auth.controller.js';
const router = express.Router();
import { signOut } from '../controllers/auth.controller.js';


router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signOut);
// router.post('/signin', signin);
router.post('/google', google);




export default router;