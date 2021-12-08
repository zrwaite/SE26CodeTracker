import {Request, Response} from "express";
import path from "path";
import fs from "fs";

const folderPath = path.join(__dirname, "../../database/");

const getDayChart = (req: Request, res: Response) => {
	if (fs.existsSync(folderPath)) {
		res.status(200).sendFile("day_chart.json", {root: folderPath});
	} else {
		res.status(404).json("404 File not found");
	}
};
export default getDayChart; 
