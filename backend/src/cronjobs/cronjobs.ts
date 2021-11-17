import cron from "node-cron";
import axios from "axios";
import fs from "fs";
import path from "path";

const getUserData = async (token: string) => {
	let apiLink = "https://wakatime.com/api/v1/users/current";
	let headers = { headers: {'Host': 'wakatime.com', 'Authorization': 'Bearer '+token}};
	try{
		const userData: any = await axios.get(apiLink,headers);
		return userData.data.data;
	} catch(e:any){
		console.log("Error",e);
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
		console.log(codeData);
		return codeData.data.data[0];
	} catch(e:any){
		console.log("Error",e);
		return false;
	}
}

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
	for (let i=0; i<weekData.length; i++){
		if (weekData.people[i].username == username) weekData.people[i].time += time;
		else weekData.people.push({username: username, time: time});
	}
	fs.writeFileSync(filePath, JSON.stringify(weekData));
}

const getCohortData = async () => {
	const folderPath = path.join(__dirname, "../../database/");
	let fileName = "cohort.json";
	let filePath = folderPath+fileName;
	let cohortData = JSON.parse(fs.readFileSync(filePath).toString());
	return cohortData;
}

const addCohortData = async (cohortData:any) => {
	const folderPath = path.join(__dirname, "../../database/");
	let fileName = "cohort.json";
	let filePath = folderPath+fileName;
	fs.writeFileSync(filePath, JSON.stringify(cohortData));
}

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

const addCodeData = async (token:string) => {
	let filePath:string|undefined = await parseUserData(token);
	if (!filePath) return console.log("Error getting filepath");
	
	let user = JSON.parse(fs.readFileSync(filePath).toString());
	let cohort = await getCohortData();
	let codeData = await getCodeData(token);
	console.log(codeData.editors);
	console.log(codeData.languages);
	console.log(codeData.operating_systems);
	return;
	if (!codeData) {
		console.log("error getting code data");
		return undefined;
	}
	
	codeData.editors.forEach((editor:any)=>{
		let name = editor.name;
		let time = editor.total_seconds;
		for (let i=0; i<user.editors.length; i++){
			if (name == user.editors[i].name) user.editors[i].time += time;
			else user.editors.push({name:name, time:time});
		} 
		for (let i=0; i<cohort.editors.length; i++){
			if (name == cohort.editors[i].name) cohort.editors[i].time += time;
			else cohort.editors.push({name:name, time:time});
		}
	});
	codeData.languages.forEach((language:any)=>{
		let name = language.name;
		let time = language.total_seconds;
		for (let i=0; i<user.languages.length; i++){
			if (name == user.languages[i].name) user.languages[i].time += time;
			else user.languages.push({name:name, time:time});
		} 
		for (let i=0; i<cohort.languages.length; i++){
			if (name == cohort.languages[i].name) cohort.languages[i].time += time;
			else cohort.languages.push({name:name, time:time});
		}
	});
	codeData.operating_systems.forEach((os:any)=>{
		let name = os.name;
		let time = os.total_seconds;
		for (let i=0; i<user.os.length; i++){
			if (name == user.os[i].name) user.os[i].time += time;
			else user.os.push({name:name, time:time});
		} 
		for (let i=0; i<cohort.os.length; i++){
			if (name == cohort.os[i].name) cohort.os[i].time += time;
			else cohort.os.push({name:name, time:time});
		} 
	});
	user.stats.push({date: codeData.range.date, time: codeData.grand_total.total_seconds});
	addDayData(user.username, codeData.grand_total.total_seconds);
	addWeekData(user.username, codeData.grand_total.total_seconds);
	addCohortData(cohort);
	//fs.writeFileSync(filePath, JSON.stringify(user));
}

const clearDay = () => {
	const folderPath = path.join(__dirname, "../../database/");
	let fileName = "day_data.json";
	let filePath = folderPath+fileName;
	let newData = {"people": []};
	fs.writeFileSync(filePath, JSON.stringify(newData));
}

const userTokens = async () => {
	// Get tokens
	let tokens = ["sec_1hLi4K9bNWTEgtKa5AzlfzwniQ2odEk18FFY9YgsDBHqkPRFwNwJnteRfavxpPjRmc5Dn2yY4if4JqWO"]
	tokens.forEach((token)=>addCodeData(token));
};
const cronjobs = () => {
	cron.schedule('* * * * *', () => {
		clearDay();
		userTokens();
	});
}
export default cronjobs;