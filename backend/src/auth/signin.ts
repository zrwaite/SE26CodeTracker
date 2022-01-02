import {Request, Response, NextFunction} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {createToken} from "./tokenFunctions";
import {getUser} from "../modules/getDatabaseInfo";
import bcrypt from "bcrypt";
import axios from "axios";

const signInController = async (req: Request, res: Response, next: NextFunction) => {
	let result:responseInterface = new response();
	//Get home data, confirming it exists
	let password = req.body.password;
	let username = req.body.username;
	//The following statements should be refactored to push all missing params
	if (username==undefined) result.errors.push("Missing username");
	else if (password==undefined) result.errors.push("Missing password");
	else {
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
	}
	res.status(result.status).json(result);
};

export default signInController;