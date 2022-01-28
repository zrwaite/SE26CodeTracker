import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {getGroup} from "../modules/getDatabaseInfo";
dotenv.config();

const getToken = (headers: any) => {
	if (headers.authorization) return headers.authorization.split(" ")[1];
	return false;
}

const verifyToken = (token: any) => {
	let decoded:any = {authorized: false};
	try {decoded = jwt.verify(token, `${process.env.TOKEN_SECRET}`);	} 
	catch (e) {decoded = {authorized: false};}
	return decoded;
}

const verifyUser = (username:string, token:string|undefined) => {
	if (!token) return {error: "no auth token provided", success: false}
	let decodedToken = verifyToken(token);
	if (!decodedToken.authorized) return {error: "invalid token", success: false}
	if (decodedToken.username !== username) return {error: "username doesn't match token", success: false}
	return {error: "", success: true}
}

const verifyGroupOwner = async (id:string, token:string|undefined) => {
	if (!token) return {error: "no auth token provided", success: false}
	let decodedToken = verifyToken(token);
	if (!decodedToken.authorized) return {error: "invalid token", success: false}
	const getGroupResponse = await getGroup(id);
	if (getGroupResponse.status == 404) return {error: "group not found", success: false}
	else if (getGroupResponse.status == 400) return {error: "error finding group", success: false}
	if (getGroupResponse.group.owner !== decodedToken.username) return {error: "you don't own the group", success: false}
	return {error: "", success: true}
}

const verifyGroupMember = async (id:string, token:string|undefined) => {
	if (!token) return {error: "no auth token provided", success: false}
	let decodedToken = verifyToken(token);
	if (!decodedToken.authorized) return {error: "invalid token", success: false}
	const getGroupResponse:any = await getGroup(id);
	if (getGroupResponse.status == 404) return {error: "group not found", success: false}
	else if (getGroupResponse.status == 400) return {error: "error finding group", success: false}
	let userFound = false;
	getGroupResponse.group.users.forEach((user:string) => {if (user === decodedToken.username) userFound = true;});
	if (!userFound) return {error: "you aren't in the group", success: false}
	return {error: "", success: true}
}

const createToken = (body: object) => {
	return jwt.sign(body, `${process.env.TOKEN_SECRET}`, { expiresIn: '3000000s' });
}
export {createToken, verifyUser, getToken, verifyGroupMember, verifyGroupOwner};