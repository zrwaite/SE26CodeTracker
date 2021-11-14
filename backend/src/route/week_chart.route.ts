import express from 'express';
import getWeekChart from '../api/week_chart';
const router = express.Router();

router.route('/')
    .get(getWeekChart)

export default router;
