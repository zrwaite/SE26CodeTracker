import cron from "node-cron";
import axios from "axios";
import fs from "fs";

const getUserData = async (token: string) => {
	let apiLink = "https://wakatime.com/api/v1/users/current";
	let headers = { headers: {
			'Authorization': 'Bearer '+token
		}};
	try{
		const userData: any = await axios.put(apiLink,{},headers);
		return userData;
	} catch(e:any){
		console.log("Error",e);
		return false;
	}
}

const parseUserData = async (token:string) => {
	let userData = await getUserData(token);
	if (!userData) return console.log("Error getting user data");
	let fileName = userData.data.username + ".json";
	let path = "../../database/users/"+fileName;
	if (!fs.existsSync(path)){
		let json = JSON.stringify({
			display_name: userData.data.display_name,
			photo: userData.data.photo,
			username: userData.data.username,
			wins: 0,
			editors: [],
			languages: [],
			os: [],
			stats: [],
		}); 
		fs.appendFile(path, json, function (e) {
			if (e) console.log(e);
		});
		

	}


}


const userTokens = async () => {
	// Get tokens
	let tokens = ["sec_1hLi4K9bNWTEgtKa5AzlfzwniQ2odEk18FFY9YgsDBHqkPRFwNwJnteRfavxpPjRmc5Dn2yY4if4JqWO", "sec_VmCNStitmHYZJiqk51PEoIHx9FY3R1T74CkfokCdOaLpc6brFA4yZEtQckOHchazH96fJPukwm3inNdi"]
	tokens.forEach((token)=>parseUserData(token));
	// let fileName = userData.data.username + ".json";
	// 
};
const cronjobs = () => {
	cron.schedule('0 1 * * *', () => {
		//userTokens();
	});
}
export default cronjobs;