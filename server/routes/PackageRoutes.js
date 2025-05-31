import express from 'express';
import { getPackageByCategoryAndId } from '../controllers/packageController.js';

const router = express.Router();

router.get('/package/:category/:id', getPackageByCategoryAndId);  // Route to get package by category and ID

export default router;
