import axios from "axios";
import fs from "fs";
import path from "path";

/* Get Data Functions*/
const getTokens = async () => {
	let users:any;
	try{
		users = await User.find();
		let tokens: any[] = [];
		users.forEach((user: any)=>{
			console.log(user);
			if (user.access_token) tokens.push(user.access_token);
			else console.log("Error getting access token from user");
		})
		return {gotTokens: true, tokens: tokens};
	} 
	catch (e: any) {console.log("Error getting tokens");}
	return {gotTokens: false, tokens: []};
}

const getUserData = async (token: string) => {
	let apiLink = "https://wakatime.com/api/v1/users/current";
	let headers = { headers: {'Host': 'wakatime.com', 'Authorization': 'Bearer '+token}};
	try{
		const userData: any = await axios.get(apiLink,headers);
		return userData.data.data;
	} catch(e:any){
		console.log("Error getting user data from wakatime api",e);
		return false;
	}
}
const getCodeData = async (token: string) => {
	let apiLink = "https://wakatime.com/api/v1/users/current/summaries?timeout=15&writes_only=true";
	let date = new Date().toLocaleDateString().toString();
	apiLink += "&start="+date+"&end="+date;
	let headers = { headers: {'Host': 'wakatime.com', 'Authorization': 'Bearer '+token}};
	try{
		const codeData: any = await axios.get(apiLink,headers);
		codeData.data.data[0].dependencies={};
		return codeData.data.data[0];
	} catch(e:any){
		console.log("Error",e);
		return false;
	}
}
const getCohortData = async () => {
	const folderPath = path.join(__dirname, "../../database/");
	let fileName = "cohort.json";
	let filePath = folderPath+fileName;
	return JSON.parse(fs.readFileSync(filePath).toString());
}

/* Parse Data Functions */
const parseUserData = async (token:string) => {
	let userData = await getUserData(token);
	if (!userData) {
		console.log("Error getting user data");
		return undefined;
	}
	const folderPath = path.join(__dirname, "../../database/users/");
	let fileName = userData.username + ".json";
	let filePath = folderPath+fileName;
	if (!fs.existsSync(filePath)){
		let json = JSON.stringify({
			display_name: userData.display_name,
			photo: userData.photo,
			username: userData.username,
			wins: 0,
			editors: [],
			languages: [],
			os: [],
			stats: [],
		}); 
		fs.appendFileSync(filePath, json)
	}
	return filePath;
}	

/* Add Data Functions */
const addDayData = async (username:string, time:number) => {
	const folderPath = path.join(__dirname, "../../database/");
	let fileName = "day_data.json";
	let filePath = folderPath+fileName;
	let dayData = JSON.parse(fs.readFileSync(filePath).toString());
	dayData.people.push({username: username, time: time});
	fs.writeFileSync(filePath, JSON.stringify(dayData));
}
const addWeekData = async (username:string, time:number) => {
	const folderPath = path.join(__dirname, "../../database/");
	let fileName = "week_data.json";
	let filePath = folderPath+fileName;
	let weekData = JSON.parse(fs.readFileSync(filePath).toString());
	let found = false;
	for (let i=0; i<weekData.people.length; i++){
		if (weekData.people[i].username != username) continue;
		weekData.people[i].time += time;
		found = true;
		break;
	}
	if (!found) weekData.people.push({username: username, time: time});
	fs.writeFileSync(filePath, JSON.stringify(weekData));
}
const addCohortData = async (cohortData:any) => {
	const folderPath = path.join(__dirname, "../../database/");
	let fileName = "cohort.json";
	let filePath = folderPath+fileName;
	fs.writeFileSync(filePath, JSON.stringify(cohortData));
}

const addCodeData = async (token:string) => {
	let filePath:string|undefined = await parseUserData(token);
	if (!filePath) return console.log("Error getting filepath");
	
	let user = JSON.parse(fs.readFileSync(filePath).toString());
	let cohort = await getCohortData();
	let codeData = await getCodeData(token);
	if (!codeData) {
		console.log("error getting code data");
		return undefined;
	}
	let found = false;
	codeData.editors.forEach((editor:any)=>{
		let name = editor.name;
		let time = editor.total_seconds;
		found = false;
		for (let i=0; i<user.editors.length; i++){
			if (name != user.editors[i].name) continue;
			user.editors[i].time += time;
			found = true;
			break;
		} 
		if (!found) user.editors.push({name:name, time:time});
		found = false;
		for (let i=0; i<cohort.editors.length; i++){
			if (name != cohort.editors[i].name) continue;
			cohort.editors[i].time += time;
			found = true;
			break;
		}
		if (!found) cohort.editors.push({name:name, time:time});
	});
	codeData.languages.forEach((language:any)=>{
		let name = language.name;
		let time = language.total_seconds;
		found = false;
		for (let i=0; i<user.languages.length; i++){
			if (name != user.languages[i].name) continue;
			user.languages[i].time += time;
			found = true; 
			break;
		} 
		if (!found) user.languages.push({name:name, time:time});
		found = false;
		for (let i=0; i<cohort.languages.length; i++){
			if (name != cohort.languages[i].name) continue;
			cohort.languages[i].time += time;
			found = true;
			break;
		}
		if (!found) cohort.languages.push({name:name, time:time});
	});
	codeData.operating_systems.forEach((os:any)=>{
		let name = os.name;
		let time = os.total_seconds;
		found = false;
		for (let i=0; i<user.os.length; i++){
			if (name != user.os[i].name) continue;
			user.os[i].time += time;
			found = true;
			break;
		} 
		if (!found) user.os.push({name:name, time:time});
		found = false;
		for (let i=0; i<cohort.os.length; i++){
			if (name != cohort.os[i].name) continue;
			cohort.os[i].time += time;
			found = true;
			break;
		} 
		if (!found) cohort.os.push({name:name, time:time});
	});
	user.stats.push({date: codeData.range.date, time: codeData.grand_total.total_seconds});
	await addDayData(user.username, codeData.grand_total.total_seconds);
	await addWeekData(user.username, codeData.grand_total.total_seconds);
	await addCohortData(cohort);
	fs.writeFileSync(filePath, JSON.stringify(user));
}

const clearDay = () => {
	const folderPath = path.join(__dirname, "../../database/");
	let fileName = "day_data.json";
	let filePath = folderPath+fileName;
	let newData = {"people": []};
	fs.writeFileSync(filePath, JSON.stringify(newData));
}

const dailyCodeData = async () => {
	clearDay();
	// Get tokens
	let {gotTokens, tokens} = await getTokens();
	if (!gotTokens) return;
	tokens.forEach((token)=>addCodeData(token));
};
export default dailyCodeData;

import User from "../models/userSchema"; //Schema for mongodb
/* register controller */
