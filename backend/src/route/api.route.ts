import express from 'express';
import getWinners from '../api/winners';
import getWeekChart from '../api/week_chart';
import getDayChart from '../api/day_chart';
import registerCtrl from '../api/register';
const router = express.Router();

router.route('/day_chart')
    .get(getDayChart)

router.route('/week_chart')
	.get(getWeekChart)

router.route('/winners')
	.get(getWinners)

router.route('/register')
	.post(registerCtrl)
export default router;

