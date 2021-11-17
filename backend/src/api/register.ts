import {Request, Response, NextFunction} from "express"; //Typescript types
import response from "../models/response"; //Created pre-formatted uniform response
import Iresponse from "../models/responseInterface";
import User from "../models/userSchema";
import axios from "axios";
interface registerPostBody {
	access_token: string;
	refresh_token: string;
	email: string;
}
const buildPostBody = async (req:any, access_token: string, refresh_token: string) =>{
	//Create the post request
	let exists = false;
	let undefinedParams: string[] = [];
	let body: any = {};
	["email"].forEach((param) => {
		if (req.body[param]==undefined) undefinedParams.push(param);
	});
	if (undefinedParams.length == 0) { 
		let postBody: registerPostBody = {
			access_token: access_token,
			refresh_token: refresh_token,
			email: req.body.email
		};
		body = postBody;
		exists = true;
	}
	return {exists: exists, body: body, errors: undefinedParams};
};
const getToken = async (code:string, result: Iresponse) => {
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
		console.log(tokenJson.data.access_token);
		access_token = tokenJson.data.access_token;
		refresh_token = tokenJson.data.refresh_token;
	}).catch((e) =>{
		if (e.response.status==400){
			console.log(e.response.data);
			console.log(e.response.status);
			result.status = 400;
			result.errors.push("Invalid Code");
		}
	});
	return {access_token: access_token, refresh_token: refresh_token};
}
const registerCtrl = async (req: Request, res: Response, next: NextFunction) => {
	let result = new response();
	let newUser;
	if (req.body.code) {
		let {access_token, refresh_token} = await getToken(req.body.code, result);
		console.log(access_token);
		if (access_token){
			let {exists, body, errors} = await buildPostBody(req, access_token, refresh_token);
			if (exists){
				try{
					newUser = new User(body);
					await newUser.save(); //Saves branch to mongodb
					result.status = 201;
					result.success = true;
					result.response = newUser;
				} catch (e) {
					console.log("error adding to database");
				}
			} else {
				errors.forEach((param)=>{result.errors.push("missing "+param)});
			}
		} else {
			result.errors.push("invalid code");
		}
	} else {
		result.errors.push("missing code")
	}
	res.status(result.status).json(result);
}
export default registerCtrl;