import express from 'express';
import contactFormCtrl from '../function/contact';
const router = express.Router();
router.route('/contact')
	.post(contactFormCtrl)

export default router;