import express from 'express';
import getWinners from '../api/day_chart';
const router = express.Router();

router.route('/')
    .get(getWinners)

export default router;
