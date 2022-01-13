import {Users} from "../models/userSchema";
import {getUserData} from "./getWakatimeInfo";
import bcrypt from "bcrypt";
import {getToken} from "./getWakatimeInfo";

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

const validateEmail = (email:string) => {
	return email.trim().endsWith("@uwaterloo.ca");
}

const createConfirmationCode = () => {
	let code = '';
	for (let i=0; i<6; i++) code+=(Math.round(Math.random()*8)+1).toString();
	return code;
}

export {postUser};