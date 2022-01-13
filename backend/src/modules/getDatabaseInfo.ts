import {Users} from "../models/userSchema"; //Schema for mongodb


/* Get Data Functions*/
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
	let status;
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

export { getUsers, getUser};