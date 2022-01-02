import {getUsers} from "../modules/getDatabaseInfo";
import {initializeUser} from "../modules/updateDatabaseInfo";


const initializeDatabaseInfo = async () => {
	const {success, users} = await getUsers();
	if (!success) return;
	users.forEach((user:any) => {
		initializeUser(user.username);
	})
	console.log(`database initialized`);
}

export {initializeDatabaseInfo}