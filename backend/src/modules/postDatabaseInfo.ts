import {Users} from "../models/userSchema";
import {getUserData} from "./getWakatimeInfo";
import bcrypt from "bcrypt";

const postUser = async (access_token:string, refresh_token:string, username:string, password:string) => {
	const errors = [];
	const userData = await getUserData(access_token);
	if (!userData) errors.push("invalid token");
	if (userData.username !== username) errors.push("email doesn't match token");
	const hash = bcrypt.hashSync(password, 10);
	if (hash=="0") errors.push("invalid hashing");
	if (errors.length==0) {
		try {
			const newUser = new Users({
				access_token: access_token, 
				refresh_token: refresh_token,
				username: username,
				created_at: userData.created_at,
				display_name: userData.display_name,
				email: userData.email,
				hash: hash,
				initialized: false,
				stats: {}
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