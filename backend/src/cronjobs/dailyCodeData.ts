import {getUsers} from "../modules/getDatabaseInfo";
import {updateUserStats} from "../modules/updateDatabaseInfo";

const dailyCodeData = async () => {
	// Get tokens
	let {success, users} = await getUsers();
	if (success) users.forEach((user:any)=>updateUserStats(user.username));
};
export default dailyCodeData;

/* register controller */
