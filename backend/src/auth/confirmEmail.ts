import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {getBodyParams} from "../modules/getParams";
import {Users} from "../models/userSchema";

const confirmEmail = async (req: Request, res: Response) => {
	let result:responseInterface = new response();
	let {success, params, errors} = await getBodyParams(req, ["username", "confirmation_code"]);
	if (success) {
		const username = params[0];
		const confirmationCode = params[1];
		const query = { username: username };
		let user = await Users.findOne(query);
		if (user) {
			if (user.confirmation_code == confirmationCode) {
				try {
					user.email_confirmed = true;
					await user.save();
					result.status = 201;
					result.success = true;
				} catch (_) {
					result.errors.push("error editing user information");
				}
			} else result.errors.push("invalid confirmation code");
		} else {
			result.status = 404;
			result.errors.push("user not found");
		}
	} else errors.forEach((error) => result.errors.push(`missing ${error}`));
	res.status(result.status).json(result);
};

export default confirmEmail;