import {Request, Response, NextFunction} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {getToken} from "../modules/getWakatimeInfo";
import validator  from "email-validator";
import {postUser} from "../modules/postDatabaseInfo";
import {getBodyParams} from "../modules/getParams";


const getPostParams = async (req:any) =>{
	//Create the post request
	let success = false;
	let email = '';
	let undefinedParams: string[] = [];
	let params: any = {};
	["email"].forEach((param) => {
		if (req.body[param]==undefined) undefinedParams.push(param);
	});
	if (undefinedParams.length == 0) { 
		if (validator.validate(req.body.email)){ // true
			params.email = req.body.email;
			success = true;
		} else {
			undefinedParams.push("Valid Email");
		}
	}
	return {success: success, params: params, errors: undefinedParams};
};

/* register controller */
export default class userController {
	static async getUser(req: Request, res: Response, next: NextFunction) {
		let result:responseInterface = new response(); //Create new standardized response
		//Get request code
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async postUser(req: Request, res: Response, next: NextFunction) {
		let result:responseInterface = new response(); //Create new standardized response
		if (req.body.code) {
			let {access_token, refresh_token} = await getToken(req.body.code, result);
			if (access_token){
				let {success, params, errors} = await getBodyParams(req, ["email"]);
				const email = params[0];
				if (success){
					let postResult = await postUser(access_token, refresh_token, email);
					if (postResult.success) {
						result.status = 201;
						result.success = true;
						result.response = postResult.response;
					} else postResult.errors.forEach((error) => {result.errors.push(error)});
				} else errors.forEach((param)=>{result.errors.push("missing "+param)});
			} else result.errors.push("invalid code");
		} else result.errors.push("missing code")
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async putUser(req: Request, res: Response, next: NextFunction) {
		let result:responseInterface = new response(); //Create new standardized response
		//Put request code
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async deleteUser(req: Request, res: Response, next: NextFunction) {
		let result:responseInterface = new response(); //Create new standardized response
		//Delete request code
		res.status(result.status).json(result); //Return whatever result remains
	}
}
