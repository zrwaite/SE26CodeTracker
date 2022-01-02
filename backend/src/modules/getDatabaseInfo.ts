import {Users} from "../models/userSchema"; //Schema for mongodb


/* Get Data Functions*/
const getTokens = async () => {
	let users:any;
	try{
		users = await Users.find();
		let tokens: any[] = [];
		users.forEach((user: any)=>{
			console.log(user);
			if (user.access_token) tokens.push(user.access_token);
			else console.log("Error getting access token from user");
		})
		return {gotTokens: true, tokens: tokens};
	} 
	catch (e: any) {console.log("Error getting tokens");}
	return {gotTokens: false, tokens: []};
}

const getUsers = async () => {
	let users:any;
	try{
		users = await Users.find();
		return {success: true, users: users};
	} 
	catch (e: any) {console.log("Error getting users");}
	return {success: false, users: []};
}
const getUser = async (username: string) => {
	let user:any;
	let status = 400;
	const query = { username: username };
	try {
		user = await Users.findOne(query);
		if (user) status = 200;
		else status = 404;
	} catch (_) {
		status = 400;
	}
	return {status: status, user: user};
}

export {getTokens, getUsers, getUser};