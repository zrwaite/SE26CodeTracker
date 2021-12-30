import {Users} from "../models/userSchema";
import {getUserData, getAllCodeData} from "./getWakatimeInfo";
import {createCodeStats} from "./parseData";

const postUser = async (access_token:string, refresh_token:string, email:string) => {
	const errors = [];
	const userData = await getUserData(access_token);
	if (!userData) errors.push("invalid token");
	if (userData.email !== email) errors.push("email doesn't match");
	if (errors.length==0) {
		console.log("here");
		let codeData = await getAllCodeData(access_token);
		let parsedCodeData = await createCodeStats(codeData);
		console.log(parsedCodeData);
		try {
			const newUser = new Users({
				access_token: access_token, 
				refresh_token: refresh_token,
				email: email,
				created_at: userData.created_at,
				display_name: userData.display_name,
				username: userData.username,
				stats: parsedCodeData
			});
			await newUser.save(); //Saves branch to mongodb
			return {success: true, response: newUser, errors: []};
		} catch (e){
			console.log(e);
			errors.push("error adding to database");
		}
	} 
	return {success: false, response: {}, errors: errors};	
}

export {postUser};