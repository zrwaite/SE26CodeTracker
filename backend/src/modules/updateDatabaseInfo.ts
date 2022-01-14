import {Users} from "../models/userSchema";
import {Groups} from "../models/groupSchema";
import {getDailyCodeData, getAllCodeData} from "./getWakatimeInfo";
import {parseDayStats, createCodeStats, mergeGroupData} from "./parseData";
import {getUser, getGroup} from "./getDatabaseInfo";

const updateUserStats = async (username:string) => {
	const query = { username: username };
	let user = await Users.findOne(query);
	if (user) {
		try {
			let newCodeData = await getDailyCodeData(user.access_token)
			let removeWeekData = false;
			if (user.stats.days.length >= 7) removeWeekData = true;
			user.stats = await parseDayStats(newCodeData, user.stats, true, true, removeWeekData);
			await user.save();
			return 201;
		} catch (_) {
			return 400;
		}
	} else return 404;
}

const initializeUser = async (username: string) => {
	const query = { username: username };
	let user = await Users.findOne(query);
	if (user) {
		try {
			let codeData = await getAllCodeData(user.access_token);
			user.stats = await createCodeStats(codeData);
			user.initialized = true;
			await user.save();
			return 201;
		} catch (_) {
			return 400;
		}
	} else return 404;
}


const initializeGroup = async (id: string, users:any[]) => {
	let group = await Groups.findOne({ _id: id });
	if (group) {
		try {
			let userList:any[] = [];
			group.users.forEach((username:string) => {
				let result = users.find((user) => {
					return user.username === username
				})
				if (result) userList.push(result);
			})
			group.stats = await mergeGroupData(userList);
			group.initialized = true;
			await group.save();
			return 201;
		} catch (_) {
			return 400;
		}
	} else return 404;
}
export {updateUserStats, initializeUser, initializeGroup}