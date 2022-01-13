import {Request, Response, NextFunction} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {createToken} from "./tokenFunctions";
import {getUser} from "../modules/getDatabaseInfo";
import bcrypt from "bcrypt";
import {getBodyParams} from "../modules/getParams";

const signInController = async (req: Request, res: Response, next: NextFunction) => {
	let result:responseInterface = new response();
	let {success, params, errors} = await getBodyParams(req, ["username", "password"]);
	if (success) {
		const username = params[0];
		const password = params[1];
		let token = await createToken({username: username, authorized: true})
		const getUserResult = await getUser(username);
		result.status = getUserResult.status;
		const user = getUserResult.user;
		if (result.status==200) {
			let passwordCheck = bcrypt.compareSync(password, user.hash);
			if (passwordCheck) {
				result.response = {token: token};
				result.success = true;
			} else {
				result.errors.push("invalid password");
				result.status = 400;
				result.success = false;
			}
		} else if (result.status==404) result.errors.push("user not found");
	} else errors.forEach((error) => result.errors.push(`missing ${error}`));
	res.status(result.status).json(result);
};

export default signInController;