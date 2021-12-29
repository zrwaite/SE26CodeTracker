import {Request, Response, NextFunction} from "express"; //Typescript types
import response from "../models/response"; //Created pre-formatted uniform response
import {getToken} from "../modules/getWakatimeInfo";
import Iresponse from "../models/responseInterface";
import User from "../models/userSchema";
import axios from "axios";
import validator  from "email-validator";
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
		if (validator.validate(req.body.email)){ // true
			let postBody: registerPostBody = {
				access_token: access_token,
				refresh_token: refresh_token,
				email: req.body.email
			};
			body = postBody;
			exists = true;
		} else {
			undefinedParams.push("Valid Email");
		}
	}
	return {exists: exists, body: body, errors: undefinedParams};
};

const registerCtrl = async (req: Request, res: Response) => {
	let result = new response();
	let newUser;
	if (req.body.code) {
		let {access_token, refresh_token} = await getToken(req.body.code, result);
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
					errors.push("error adding to database");
				}
			} else errors.forEach((param)=>{result.errors.push("missing "+param)});
		} else result.errors.push("Invalid Code");
	} else result.errors.push("missing code")
	res.status(result.status).json(result);
}
export default registerCtrl;