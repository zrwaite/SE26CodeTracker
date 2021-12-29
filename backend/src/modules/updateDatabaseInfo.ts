import {Users} from "../models/userSchema";

const putUserStats = async (username:string, stats:any) => {
	const query = { username: username };
	let user = await Users.findOne(query);
	if (user) {
		try {
			user.stats = stats;
			await user.save();
			return 201;
		} catch (_) {
			return 400;
		}
	} else return 404;
}

export {putUserStats}