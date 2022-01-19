import express from 'express';
import userCtrl from '../api/user';
import groupCtrl from '../api/group';
const router = express.Router();
router.route('/user')
	.get(userCtrl.getUser)
	.post(userCtrl.postUser)
	.put(userCtrl.putUser)
	.delete(userCtrl.deleteUser)
router.route('/group')
	.get(groupCtrl.getGroup)
	.post(groupCtrl.postGroup)
	.put(groupCtrl.putGroup)
	.delete(groupCtrl.deleteGroup)
export default router;