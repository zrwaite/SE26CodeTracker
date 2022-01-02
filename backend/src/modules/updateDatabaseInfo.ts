import {Users} from "../models/userSchema";
import {getDailyCodeData, getAllCodeData} from "../modules/getWakatimeInfo";
import {parseDayStats, createCodeStats} from "../modules/parseData";

const updateUserStats = async (username:string) => {
	const query = { username: username };
	let user = await Users.findOne(query);
	if (user) {
		try {
			let newCodeData = await getDailyCodeData(user.access_token)
			let updatedStats = await parseDayStats(newCodeData, user.stats, true, true);
			user.stats = updatedStats;
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
			let parsedCodeData = await createCodeStats(codeData);
			user.stats = parsedCodeData;
			user.initialized = true;
			await user.save();
			return 201;
		} catch (_) {
			return 400;
		}
	} else return 404;
}

export {updateUserStats, initializeUser}