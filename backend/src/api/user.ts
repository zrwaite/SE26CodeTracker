import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {postUser} from "../modules/postDatabaseInfo";
import {emailConfirmation} from "../modules/sendMail";
import {getUser} from "../modules/getDatabaseInfo";
import {getBodyParams, getQueryParams} from "../modules/getParams";
import {initializeUser, updateUser} from "../modules/updateDatabaseInfo";
import {initializeNewUser} from "../modules/initializeDatabase";
import {deleteUser} from "../modules/deleteDatabaseInfo";
import {createToken, verifyUser, getToken} from "../auth/tokenFunctions";


/* register controller */
export default class userController {
	static async getUser(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success, params, errors} = await getQueryParams(req, ["username"]);
		if (success) {
			const username = params[0];
			let tokenResult = verifyUser(username, getToken(req.headers));
			if (tokenResult.success) {
				const getUserResponse = await getUser(username);
				result.status = getUserResponse.status;
				if (result.status == 200) {
					result.success = true;
					result.response = getUserResponse.user;
				}
				else if (result.status == 404) result.errors.push("user not found");
			} else result.errors.push(tokenResult.error);
		} else errors.forEach((error) => result.errors.push(error));
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async postUser(req: Request, res: Response) {
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
				result.response = {
					userData: postResult.response,
					token: createToken({username: postResult.response.username, authorized: true})
				}
				emailConfirmation(postResult.response.confirmation_code, email);
				initializeNewUser(username);
			} else postResult.errors.forEach((error) => {result.errors.push(error)});
		} else errors.forEach((param)=>{result.errors.push("missing "+param)});
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async putUser(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success, params, errors} = await getQueryParams(req, ["username"]);
		if (success) {
			const username = params[0];
			let tokenResult = verifyUser(username, getToken(req.headers));
			if (tokenResult.success) {
				const updateUserResponse = await updateUser(username, req.body.anonymous, req.body.email_notifications);
				result.status = updateUserResponse.status;
				if (result.status == 201) {
					result.success = true;
					result.response = updateUserResponse.user;
				}
				else updateUserResponse.errors.forEach((error) => result.errors.push(error));
			} else result.errors.push(tokenResult.error);
		} else errors.forEach((error) => result.errors.push(error));
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async deleteUser(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success, params, errors} = await getBodyParams(req, ["username"]);
		if (success) {
			const username = params[0];
			let tokenResult = verifyUser(username, getToken(req.headers));
			if (tokenResult.success) {
				result.status = await deleteUser(username);
				if (result.status == 200) result.success = true;
				else if (result.status == 404) result.errors.push("user not found");
				else result.errors.push("deletion failed");
			} else result.errors.push(tokenResult.error);
		} else errors.forEach((error) => result.errors.push(error));
		res.status(result.status).json(result); //Return whatever result remains
	}
}
