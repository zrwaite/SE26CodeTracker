import {Users} from "../models/userSchema"; //Schema for mongodb
import {Groups} from "../models/groupSchema"; //Schema for mongodb

const getEntries = async (schema: any, name:string) => {
	let entries:any;
	try{
		entries = await schema.find();
		return {success: true, entries: entries};
	} 
	catch (e: any) {console.log(`Error getting ${name}`);}
	return {success: false, entries: []};
}
const getEntry = async (schema: any, query: object) => {
	let entry:any;
	let status;
	try {
		entry = await schema.findOne(query);
		if (entry) status = 200;
		else status = 404;
	} catch (_) {
		status = 400;
	}
	return {status: status, entry: entry};
}

/* Get Data Functions*/
const getUsers = async () => {
	const {success, entries} = await getEntries(Users, "users");
	return {success: success, users: entries};
}
const getUser = async (username: string) => {
	const {status, entry} = await getEntry(Users, { username: username });
	return {status: status, user: entry};
}

const getGroups = async () => {
	const {success, entries} = await getEntries(Groups, "groups");
	return {success: success, groups: entries};
}
const getGroup = async (id: string) => {
	const {status, entry} = await getEntry(Groups, { _id: id });
	return {status: status, group: entry};
}


export { getUsers, getUser, getGroups, getGroup };