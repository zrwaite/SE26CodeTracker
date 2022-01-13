import {Users} from "../models/userSchema";
import {getDailyCodeData, getAllCodeData} from "./getWakatimeInfo";
import {parseDayStats, createCodeStats} from "./parseData";

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

export {updateUserStats, initializeUser}