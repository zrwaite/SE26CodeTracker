import {getUsers, getGroups} from "./getDatabaseInfo";
import {initializeUser} from "./updateDatabaseInfo";

const initializeDatabase = async () => {
	const users = await initializeUserStats();
	await initializeGroupStats(users);
	console.log(`database initialized`);
}


const initializeUserStats = async () => {
	const {success, users} = await getUsers();
	if (!success) return;
	users.forEach((user:any) => {
		initializeUser(user.username);
	})
	return users;
}

const initializeGroupStats = async (users:any) => {
	console.log(users);
	const {success, groups} = await getGroups();
	if (!success) return;
	groups.forEach((group:any) => {
		// initializeGroup(group._id, users);
	})
}

export {initializeDatabase}