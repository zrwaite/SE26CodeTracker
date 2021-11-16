import express from "express";
import cors from "cors";
import env from "dotenv";
import path from "path";
//import jwt from 'express-jwt';
//import jwks from 'jwks-rsa';
import response from "./models/response"; //Created pre-formatted uniform response

const app = express();

//configs
env.config();

// utilities
app.use(cors());
app.use(express.json());


// routes
import winnersRoute from "./route/winners.route";
import dayChartRoute from "./route/day_chart.route";
import weekChartRoute from "./route/week_chart.route";
import registerRoute from "./route/register.route";

// api
app.use("/api/day_chart", dayChartRoute);
app.use("/api/week_chart", weekChartRoute);
app.use("/api/winners", winnersRoute);
app.use("/api/register", registerRoute);

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
