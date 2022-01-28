import {getUsers} from "../modules/getDatabaseInfo";
import {updateUserStats, updateGroupStats} from "../modules/updateDatabaseInfo";
import {getGroups} from "../modules/getDatabaseInfo";

const dailyGroupData = async (users:any[]) => {
	// Get tokens
	let {success, groups} = await getGroups();
	if (success) groups.forEach((group:any)=>{
		let groupUsers:any[] = [];
		users.forEach((user) => {
			if (group.users.includes(user.username)) groupUsers.push(user);
		})
		updateGroupStats(group._id, groupUsers);
	})
};
const dailyUserData = async () => {
	let {success, users} = await getUsers();
	if (success) {
		for (let i=0; i<users.length; i++) {
			if (i===users.length-1) await updateUserStats(users[i].username);
			else updateUserStats(users[i].username);
		}
		return {success:true, users: users};
	}
	return {success:false, users: null};
}

const dailyCodeData = async () => {
	// Get tokens
	let {success, users} = await dailyUserData();
	if (success) dailyGroupData(users);
	else console.log("cronjob failed");
};
export default dailyCodeData;

/* register controller */
