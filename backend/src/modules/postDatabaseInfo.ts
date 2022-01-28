import {Users} from "../models/userSchema";
import {Groups} from "../models/groupSchema";
import {getUserData} from "./getWakatimeInfo";
import {getUser} from "./getDatabaseInfo";
import bcrypt from "bcrypt";
import {getToken} from "./getWakatimeInfo";
import {addUserToGroup} from "./updateDatabaseInfo";
import env from "dotenv";
env.config();

const postUser = async (code:string, username:string, password:string, email:string) => {
	const errors = [];
	const confirmationCode = createConfirmationCode();
	if (!code) errors.push("missing code");
	if (!username) errors.push("missing username");
	if (!password) errors.push("missing password");
	if (!email) errors.push("missing email");
	else if (!validateEmail(email)) errors.push("not a uwaterloo email");
	const hash = bcrypt.hashSync(password, 10);
	if (hash=="0") errors.push("invalid hashing");
	if (errors.length==0) {
		let {accessToken, refreshToken} = await getToken(code);
		if (accessToken) {
			const userData = await getUserData(accessToken);
			if (!userData) errors.push("invalid token");
			else if (userData.username !== username) errors.push("username doesn't match token");
			else {
				try {
					const newUser = new Users({
						access_token: accessToken, 
						refresh_token: refreshToken,
						username: username,
						created_at: userData.created_at,
						display_name: userData.display_name,
						email: email,
						confirmation_code: confirmationCode,
						hash: hash,
						initialized: false,
						stats: {}
					});
					await newUser.save(); //Saves branch to mongodb

					let addUserSuccess = await addUserToGroup(process.env.COHORT_ID, username);
					console.log(addUserSuccess);

					return {success: true, response: newUser, errors: []};
				} catch (e:any){
					if (e.code == 11000) errors.push("Username or email already in use");
					else {
						errors.push("error adding to database");
						console.log(e);
					}
				}
			}
		} else errors.push("invalid code");	
	} 
	return {success: false, response: {}, errors: errors};	
}


const postGroup = async (displayName: string, ownerUsername:string) => {
	const errors = [];
	if (!displayName) errors.push("missing display_name");
	if (!ownerUsername) errors.push("missing owner_username");
	const owner = await getUser(ownerUsername);
	if (errors.length==0) {
		try {
			const newGroup = new Groups({
				display_name: displayName, 
				owner: ownerUsername,
				stats: {
					week_winners: [],
					day_order: [],
					total_day_time: owner.user.stats.day_time,
					total_week_time: owner.user.stats.week_time,
					editors: owner.user.stats.editors,
					languages: owner.user.stats.languages,
					os: owner.user.stats.os,
					days: owner.user.stats.days,
				},
				users: [ownerUsername],
			});
			await newGroup.save(); //Saves branch to mongodb
			return {success: true, response: newGroup, errors: []};
		} catch (e:any){
			errors.push("error adding to database");
			console.log(e);
		}
	} 
	return {success: false, response: {}, errors: errors};	
}

const validateEmail = (email:string) => {
	return email.trim().endsWith("@uwaterloo.ca");
}

const createConfirmationCode = () => {
	let code = '';
	for (let i=0; i<6; i++) code+=(Math.round(Math.random()*8)+1).toString();
	return code;
}

export {postUser, postGroup};