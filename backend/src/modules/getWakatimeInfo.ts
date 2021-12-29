import axios from "axios";
import { responseInterface} from "../models/response"; //Created pre-formatted uniform response

const getToken = async (code:string, result: responseInterface) => {
	let link = "https://wakatime.com/oauth/token";
	let tokenPostBody = "";
	tokenPostBody += "grant_type=authorization_code"
	tokenPostBody += "&redirect_uri=https://wakatime.com/oauth/test"
	tokenPostBody += `&client_id=${process.env.CLIENT_ID}`;
	tokenPostBody += `&client_secret=${process.env.CLIENT_SECRET}`;
	tokenPostBody += `&code=${code}`;
	let access_token:string = "";
	let refresh_token:string = "";
	await axios.post(link, tokenPostBody)
	.then((tokenJson) => {
		access_token = tokenJson.data.access_token;
		refresh_token = tokenJson.data.refresh_token;
	}).catch((e) =>{
		if (e.response.status==400){
			console.log(e.response.data);
			console.log(e.response.status);
		}
	});
	return {access_token: access_token, refresh_token: refresh_token};
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
		delete codeData.data.data[0].dependencies;
		delete codeData.data.data[0].range;
		delete codeData.data.data[0].machines;
		delete codeData.data.data[0].projects;
		return codeData.data.data[0];
	} catch(e:any){
		console.log("Error",e);
		return false;
	}
}

export {getUserData, getCodeData, getToken};