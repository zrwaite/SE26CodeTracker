import cron from "node-cron";
import dailyCodeData from "./dailyCodeData";
import {createCodeStats} from "../modules/parseData";
import {getAllCodeData} from "../modules/getWakatimeInfo";
const cronjobs = () => {
	// testFunc();
	cron.schedule('1 0 * * *', () => {
		dailyCodeData();
	});
}
export default cronjobs;