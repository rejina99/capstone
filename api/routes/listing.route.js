import express from 'express';
import { creatListing } from '../controllers/listing.controller.js';


const router = express.Router();

router.post('/create', creatListing);

export default router;