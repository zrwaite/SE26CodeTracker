import express from 'express';
import getWinners from '../api/winners';
import getWeekChart from '../api/week_chart';
import getDayChart from '../api/day_chart';
import userCtrl from '../api/user';
const router = express.Router();

router.route('/day_chart')
    .get(getDayChart)

router.route('/week_chart')
	.get(getWeekChart)

router.route('/winners')
	.get(getWinners)

router.route('/user')
	.get(userCtrl.getUser)
	.post(userCtrl.postUser)
	.put(userCtrl.putUser)
	.delete(userCtrl.deleteUser)
export default router;

