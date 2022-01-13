import {Request, Response, NextFunction} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {postUser} from "../modules/postDatabaseInfo";
import {getUser} from "../modules/getDatabaseInfo";
import {getBodyParams, getQueryParams} from "../modules/getParams";
import {Users} from "../models/userSchema";
import {initializeUser} from "../modules/updateDatabaseInfo";
import bcrypt from "bcrypt";


/* register controller */
export default class userController {
	static async getUser(req: Request, res: Response, next: NextFunction) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success, params, errors} = await getQueryParams(req, ["username"]);
		if (success) {
			const username = params[0];
			const getUserResponse = await getUser(username);
			result.status = getUserResponse.status;
			if (result.status == 200) {
				result.success = true;
				result.response = getUserResponse.user;
			}
			else if (result.status == 404) result.errors.push("user not found");
		} else errors.forEach((error) => result.errors.push(error));
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async postUser(req: Request, res: Response, next: NextFunction) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success, params, errors} = await getBodyParams(req, ["username", "password", "email", "code"]);
		const username = params[0];
		const password = params[1];
		const email = params[2];
		const code = params[3];
		if (success){
			let postResult = await postUser(code, username, password, email);
			if (postResult.success) {
				result.status = 201;
				result.success = true;
				result.response = postResult.response;
				initializeUser(username)
			} else postResult.errors.forEach((error) => {result.errors.push(error)});
		} else errors.forEach((param)=>{result.errors.push("missing "+param)});
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
