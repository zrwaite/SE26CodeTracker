import {getDailyCodeData, getUserData} from "../modules/getWakatimeInfo";
import {getUsers} from "../modules/getDatabaseInfo";
import {updateUserStats} from "../modules/updateDatabaseInfo";
import fs from "fs";
import path from "path";

const dailyCodeData = async () => {
	// Get tokens
	let {success, users} = await getUsers();
	if (!success) return;
	users.forEach((user:any)=>updateUserStats(user.username));
};
export default dailyCodeData;

/* register controller */
