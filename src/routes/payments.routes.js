import express from 'express';
const router = express.Router();

import PaymentController from '../controllers/payment.controller.js';

router.post('/payment', PaymentController.createPyment);

export default router; 