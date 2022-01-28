import cron from "node-cron";
import dailyCodeData from "./dailyCodeData";
const cronjobs = () => {
	// cron.schedule('1 0 * * *', () => {
	cron.schedule('* * * * *', () => {
		dailyCodeData();
	});
}
export default cronjobs;