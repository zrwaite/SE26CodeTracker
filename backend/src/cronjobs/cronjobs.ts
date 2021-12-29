import cron from "node-cron";
import dailyCodeData from "./dailyCodeData";
import {createCodeStats} from "../modules/parseData";
import {getAllCodeData} from "../modules/getWakatimeInfo";
// dailyCodeData();
const testFunc = async () =>{
	let answer = await getAllCodeData("sec_BkehSGo2t3VyfnmDS2WZWfwUPHdPL0c4hLIkos7dUtpKrdnzCTvUPH1rkHP6f49ENp0tLVEN2YtrOByq");
}
const cronjobs = () => {
	testFunc();
	cron.schedule('1 * * * *', () => {
		// dailyCodeData();
	});
}
export default cronjobs;