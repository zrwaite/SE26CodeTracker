import {getUsers, getGroups} from "./getDatabaseInfo";
import {initializeUser, initializeGroup} from "./updateDatabaseInfo";

const initializeDatabase = async () => {
	const users = await initializeUserStats();
	await initializeGroupStats(users);
	console.log(`database initialized`);
}

const initializeNewUser = async (username: string) => {
	let status = await initializeUser(username);
	if (status!==201) {
		console.log(`Error initializing new user ${username}, status ${status}`);
		return;
	}
	const {success, users} = await getUsers();
	if (!success) return;
	await initializeGroupStats(users);
	console.log(`new user initialized`);
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
	const {success, groups} = await getGroups();
	if (!success) {
		console.log("failed to get groups wile initializing group stats");
		return;
	}
	groups.forEach((group:any) => {
		initializeGroup(group._id, users);
	})
}

export {initializeDatabase, initializeNewUser, initializeGroupStats}