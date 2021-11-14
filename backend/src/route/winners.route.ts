import express from 'express';
import getWinners from '../api/winners';
const router = express.Router();

router.route('/')
    .get(getWinners)

export default router;
