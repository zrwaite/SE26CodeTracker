import express from 'express';
import signinCtrl from '../auth/signin';
const router = express.Router();
router.route('/signin')
	.post(signinCtrl)
export default router;

