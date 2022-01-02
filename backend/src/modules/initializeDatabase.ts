import {getUsers} from "./getDatabaseInfo";
import {initializeUser} from "./updateDatabaseInfo";

const initializeDatabase = async () => {
	await initializeUserStats();
	console.log(`database initialized`);
}


const initializeUserStats = async () => {
	const {success, users} = await getUsers();
	if (!success) return;
	users.forEach((user:any) => {
		initializeUser(user.username);
	})
}

export {initializeDatabase}