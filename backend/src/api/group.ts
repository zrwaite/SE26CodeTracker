import {Request, Response} from "express"; //Typescript types
import {response, responseInterface} from "../models/response"; //Created pre-formatted uniform response
import {postGroup} from "../modules/postDatabaseInfo";
import {getGroup} from "../modules/getDatabaseInfo";
import {updateGroup} from "../modules/updateDatabaseInfo";
import {deleteGroup} from "../modules/deleteDatabaseInfo";
import {getBodyParams, getQueryParams} from "../modules/getParams";
import {verifyGroupMember, verifyGroupOwner, getToken} from "../auth/tokenFunctions";


/* register controller */
export default class groupController {
	static async getGroup(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success, params, errors} = await getQueryParams(req, ["id"]);
		if (success) {
			const id = params[0];
			let tokenResult = await verifyGroupMember(id, getToken(req.headers));
			if (tokenResult.success) {
				const getGroupResponse = await getGroup(id);
				result.status = getGroupResponse.status;
				if (result.status == 200) {
					result.success = true;
					result.response = getGroupResponse.group;
				}
				else if (result.status == 404) result.errors.push("group not found");
			} else result.errors.push(tokenResult.error);
		} else errors.forEach((error) => result.errors.push("missing " + error));
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async postGroup(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success, params, errors} = await getBodyParams(req, ["display_name", "owner_username"]);
		const displayName = params[0];
		const ownerUsername = params[1];
		if (success){
			let postResult = await postGroup(displayName, ownerUsername);
			if (postResult.success) {
				result.status = 201;
				result.success = true;
				result.response = postResult.response;
			} else postResult.errors.forEach((error) => {result.errors.push(error)});
		} else errors.forEach((param)=>{result.errors.push("missing "+param)});
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async putGroup(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success, params, errors} = await getQueryParams(req, ["id"]);
		if (success) {
			const id = params[0];
			let tokenResult = await verifyGroupOwner(id, getToken(req.headers));
			if (tokenResult.success) {
				const updateGroupResponse = await updateGroup(id, req.body.display_name);
				result.status = updateGroupResponse.status;
				if (result.status == 201) {
					result.success = true;
					result.response = updateGroupResponse.user;
				}
				else updateGroupResponse.errors.forEach((error) => result.errors.push(error));
			} else result.errors.push(tokenResult.error);
		} else errors.forEach((error) => result.errors.push(error));
		res.status(result.status).json(result); //Return whatever result remains
	}
	static async deleteGroup(req: Request, res: Response) {
		let result:responseInterface = new response(); //Create new standardized response
		let {success, params, errors} = await getBodyParams(req, ["id"]);
		if (success) {
			const id = params[0];
			let tokenResult = await verifyGroupOwner(id, getToken(req.headers));
			if (tokenResult.success) {
				result.status = await deleteGroup(id);
				if (result.status == 200) result.success = true;
				else if (result.status == 404) result.errors.push("group not found");
				else result.errors.push("deletion failed");
			} else result.errors.push(tokenResult.error);
		} else errors.forEach((error) => result.errors.push(error));
		res.status(result.status).json(result); //Return whatever result remains
	}
}
