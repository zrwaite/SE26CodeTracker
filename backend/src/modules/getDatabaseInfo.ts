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

export {getTokens, getUsers};