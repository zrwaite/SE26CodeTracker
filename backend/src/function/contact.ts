import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {contactFormEmail} from "../modules/sendMail";
import {getBodyParams} from "../modules/getParams";

const contactForm = async (req: Request, res: Response) => {
	let result:responseInterface = new response(); //Create new standardized response
	let {success, params, errors} = await getBodyParams(req, ["email", "message", "contact_type"]);
	const email = params[0];
	const message = params[1];
	const contactType = params[2];
	if (success){
		let emailResult = await contactFormEmail(email, message, contactType);
		if (emailResult.success) {
			result.status = 201;
			result.success = true;
			result.response = {};
		} else emailResult.errors.forEach((error) => {result.errors.push(error)});
	} else errors.forEach((param)=>{result.errors.push("missing "+param)});
	res.status(result.status).json(result); //Return whatever result remains
}

export default contactForm