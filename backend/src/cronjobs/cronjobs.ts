import cron from "node-cron";
import dailyCodeData from "./dailyCodeData";
const cronjobs = () => {
	cron.schedule('1 0 * * *', () => {
		dailyCodeData();
	});
}
export default cronjobs;