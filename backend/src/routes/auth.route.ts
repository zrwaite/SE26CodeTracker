import express from 'express';
import signinCtrl from '../auth/signin';
import confirmEmail from '../auth/confirmEmail';
const router = express.Router();
router.route('/signin')
	.post(signinCtrl)

router.route('/confirmEmail')
	.post(confirmEmail)
export default router;

