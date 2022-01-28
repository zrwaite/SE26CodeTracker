import {Users} from "../models/userSchema";
import {Groups} from "../models/groupSchema";
import {getDailyCodeData, getAllCodeData} from "./getWakatimeInfo";
import {parseDayStats, createCodeStats, mergeGroupData} from "./parseData";
import {getUser, getGroup} from "./getDatabaseInfo";

const updateUserStats = async (username:string) => {
	const query = { username: username };
	let user = await Users.findOne(query);
	if (user) {
		try {
			let newCodeData = await getDailyCodeData(user.access_token)
			let removeWeekData = false;
			if (user.stats.days.length >= 7) removeWeekData = true;
			user.stats = await parseDayStats(newCodeData, user.stats, true, true, removeWeekData);
			await user.save();
			return 201;
		} catch (_) {
			console.log(username, "user stats failed to be updated");
			return 400;
		}
	} else {
		console.log(username, "user stats failed to be found");
		return 404;
	}
}

const updateGroupStats = async (id:string, users:any[]) => {
	let group = await Groups.findOne({ _id: id });
	if (group) {
		try {
			// let userList:any[] = [];
			// group.users.forEach((username:string) => {
			// 	let result = users.find((user) => {
			// 		return user.username === username
			// 	})
			// 	if (result) userList.push(result);
			// })
			let mergedData = await mergeGroupData(users);
			group.stats = mergedData;
			await group.save();
			return 201;
		} catch (_) {
			console.log(group.display_name, "group stats failed to be updated");
			return 400;
		}
	} else {
		console.log(group.display_name, "group stats failed to be found");
		return 404;
	}
}

const initializeUser = async (username: string) => {
	const query = { username: username };
	let user = await Users.findOne(query);
	if (user) {
		try {
			let codeData = await getAllCodeData(user.access_token);
			user.stats = await createCodeStats(codeData);
			user.initialized = true;
			await user.save();
			return 201;
		} catch (_) {
			return 400;
		}
	} else return 404;
}

const updateEntry = async (schema: any, query:object, update:object): Promise<{status: number, entry: any}> => {
	let entry:any;
	let status = 404;
	try {
		entry = await schema.findOneAndUpdate(query, update, {new:true});
		if (entry) status = 201;
	} catch (_) {
		status = 400;
	}
	return {status: status, entry: entry}
}

const filterObj = (obj:any):boolean => {
	let defined = false;
	for (const [key, value] of Object.entries(obj)) {
		if (value === undefined) delete obj[key];
		else defined = true;
	}
	return defined;
}

const updateUser = async (username:string, anonymous:boolean|undefined, emailNotifications: boolean|undefined):Promise<{ errors: string[]; user:any, status:number }> => {
	let update = {
		anonymous: anonymous,
		email_notifications: emailNotifications
	}
	if (!filterObj(update)) return {errors: ["no updates specified"], user:{}, status: 400}
	let errors = [];
	let {entry, status} = await updateEntry(Users, {username: username}, update);
	if (status===400) errors.push("error updating user");
	else if (status===404) errors.push("user not found");
	return 	{errors: errors, user: entry, status:status}
}

const updateGroup = async (id:string, displayName:string|undefined):Promise<{ errors: string[]; user:any, status:number }> => {
	let update = {
		display_name: displayName
	}
	if (!filterObj(update)) return {errors: ["no updates specified"], user:{}, status: 400}
	let errors = [];
	let {entry, status} = await updateEntry(Groups, {id: id}, update);
	if (status===400) errors.push("error updating group");
	else if (status===404) errors.push("group not found");
	return 	{errors: errors, user: entry, status:status}
}
const addUserToGroup = async (id:string|undefined, username:string) => {
	if (!id) return 400;
	try {
		const query = { _id: id };
		let group = await Groups.findOne(query);
		if (group) {
			group.users.push(username);
			await group.save()
			return 201;
		} return 404;
	} catch (_) {
		return 400;
	}
}

const removeUserFromGroup = async (id:string|undefined, username:string) => {
	if (!id) return 400;
	try {
		const query = { _id: id };
		let group = await Groups.findOne(query);
		if (group) {
			let index = group.users.indexOf(username);
			if (index === -1) return 404;
			group.users.splice(index, 1);
			await group.save()
			return 201;
		} return 404;
	} catch (_) {
		return 400;
	}
}

const initializeGroup = async (id: string, users:any[]) => {
	let group = await Groups.findOne({ _id: id });
	if (group) {
		try {
			let userList:any[] = [];
			group.users.forEach((username:string) => {
				let result = users.find((user) => {
					return user.username === username
				})
				if (result) userList.push(result);
			})
			let mergedData = await mergeGroupData(users);
			group.stats = mergedData;
			group.initialized = true;
			await group.save();
			return 201;
		} catch (_) {
			console.log(group.display_name, "group failed to be initialized");
			return 400;
		}
	} else {
		console.log(group.display_name, "group failed to be found");
		return 404;
	}
}
export {updateGroupStats, updateUserStats, initializeUser, updateUser, updateGroup, addUserToGroup, removeUserFromGroup, initializeGroup}