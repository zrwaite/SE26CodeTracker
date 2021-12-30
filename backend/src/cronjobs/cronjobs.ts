import cron from "node-cron";
import dailyCodeData from "./dailyCodeData";
import {createCodeStats} from "../modules/parseData";
import {getAllCodeData} from "../modules/getWakatimeInfo";
// dailyCodeData();
const cronjobs = () => {
	// testFunc();
	cron.schedule('1 * * * *', () => {
		// dailyCodeData();
	});
}
export default cronjobs;