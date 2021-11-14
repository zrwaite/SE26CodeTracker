import express from 'express';
import registerCtrl from '../api/register';
const router = express.Router();

router.route('/')
    .post(registerCtrl)

export default router;
