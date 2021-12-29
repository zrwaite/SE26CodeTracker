import cron from "node-cron";
import dailyCodeData from "./dailyCodeData";
dailyCodeData();
const cronjobs = () => {
	cron.schedule('1 * * * *', () => {
		dailyCodeData();
	});
}
export default cronjobs;