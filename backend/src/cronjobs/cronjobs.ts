import cron from "node-cron";
import dailyCodeData from "./dailyCodeData";
const cronjobs = () => {
	cron.schedule('* * * * *', () => {
		//dailyCodeData();
	});
}
export default cronjobs;