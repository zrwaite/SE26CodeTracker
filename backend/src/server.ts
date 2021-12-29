import express from "express";
import cors from "cors";
import env from "dotenv";
// import path from "path";
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

// api routing
app.use("/api", apiRoute);

app.get("/test", (req, res) => {
	let result = new response(200, [], {page: "test"}, true);
	res.status(result.status).json(result); //Return 200 result
});

app.get("/backend/*", (req, res) => {
	let result = new response(403, [], {response: "nice try buddy"});
	res.status(result.status).json(result); //Doesn't allow people access to backend files
});


// app.get("/files/*", getFile);

export default app; //Export server for use in index.js
