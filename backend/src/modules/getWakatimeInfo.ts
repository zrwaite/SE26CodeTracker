import axios from "axios";
import { responseInterface} from "../models/response"; //Created pre-formatted uniform response

const getToken = async (code:string) => {
	let link = "https://wakatime.com/oauth/token";
	let tokenPostBody = "";
	tokenPostBody += "grant_type=authorization_code"
	tokenPostBody += "&redirect_uri=https://wakatime.com/oauth/test"
	tokenPostBody += `&client_id=${process.env.CLIENT_ID}`;
	tokenPostBody += `&client_secret=${process.env.CLIENT_SECRET}`;
	tokenPostBody += `&code=${code}`;
	let accessToken:string = "";
	let refreshToken:string = "";
	await axios.post(link, tokenPostBody)
	.then((tokenJson) => {
		accessToken = tokenJson.data.access_token;
		refreshToken = tokenJson.data.refresh_token;
	}).catch((e) =>{
		if (e.response.status==400){
			console.log(e.response.data);
			console.log(e.response.status);
		}
	});
	return {accessToken: accessToken, refreshToken: refreshToken};
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
const getCodeData = async (token: string, startDate: string, endDate: string) => {
	let apiLink = "https://wakatime.com/api/v1/users/current/summaries?timeout=15&writes_only=true";
	apiLink += "&start="+startDate+"&end="+endDate;
	let headers = { headers: {'Host': 'wakatime.com', 'Authorization': 'Bearer '+token}};
	try{
		const codeData: any = await axios.get(apiLink,headers);
		let codeStats = codeData.data.data;
		for (let i=0; i<codeStats.length; i++){
			delete codeStats[i].dependencies
			delete codeStats[i].machines;
			delete codeStats[i].projects;
		}
		return codeStats;
	} catch(e:any){
		console.log("Error",e);
		return false;
	}
}
const getDailyCodeData = async (token:string) => {
	let date = new Date().toLocaleDateString().toString();
	let codeData = await getCodeData(token, date, date)
	if (codeData) return codeData[0];
	else return false;
}

const getAllCodeData = async (token:string) => {
	let endDate = new Date().toLocaleDateString().toString();
	let userData = await getUserData(token);
	let startDate = userData.created_at;
	return await getCodeData(token, startDate, endDate)
}

export {getUserData, getDailyCodeData, getAllCodeData, getToken};