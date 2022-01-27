import {Groups} from "../models/groupSchema"; //Schema for mongodb
import {Users} from "../models/userSchema"; //Schema for mongodb
const deleteEntry = async (schema:any, query:object) => {
	let status = 404;
	try{
		let success = await schema.deleteOne(query);
		if (success) status = 200;
	} 
	catch (_) {status = 400}
	return status;
}

const deleteUser = async (username:string) => {
	return await deleteEntry(Users, {username: username});
}

const deleteGroup = async (id:string) => {
	return await deleteEntry(Groups, {id: id});
}

export {deleteUser, deleteGroup}