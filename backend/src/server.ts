import express from "express";
import cors from "cors";
import env from "dotenv";
import path from "path";
import fs from "fs";
//import jwt from 'express-jwt';
//import jwks from 'jwks-rsa';
import {response} from "./models/response"; //Created pre-formatted uniform response
// import { graphqlHTTP } from "express-graphql";

const app = express();

//configs
env.config();

// utilities
app.use(cors());
app.use(express.json());


// routes
import apiRoute from "./routes/api.route";
import authRoute from "./routes/auth.route";
import functionRoute from "./routes/function.route";

// api routing
app.use("/api", apiRoute);
app.use("/auth", authRoute);
app.use("/function", functionRoute);

app.get("/test", (req, res) => {
	let result = new response(200, [], {page: "test"}, true);
	res.status(result.status).json(result); //Return 200 result
});

app.get("/backend/*", (req, res) => {
	let result = new response(403, [], {response: "nice try buddy"});
	res.status(result.status).json(result); //Doesn't allow people access to backend files
});

const folderPath = path.join(__dirname, "../../frontend");

app.get("/", (req, res) => {
	if (fs.existsSync(folderPath + "/index.html")) res.status(200).sendFile("/index.html", {root: folderPath});
	else res.status(404).json("404 File not found");
})

app.get("*", (req, res) => {
	if (fs.existsSync(folderPath + req.url + "/index.html")) {
		res.status(200).sendFile(req.url  + "/index.html", {root: folderPath});
	} else if (fs.existsSync(folderPath + req.url)) {
		res.status(200).sendFile(req.url, {root: folderPath});
	} else { 
		res.status(404).json("404 File not found");
	}
})

export default app; //Export server for use in index.ts
