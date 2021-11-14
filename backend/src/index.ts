import env from "dotenv";
import mongoose from "mongoose";
import app from "./server";
import cronjobs from "./cronjobs/cronjobs";

// Configs
env.config();
const port = process.env.PORT || 2000;
app.listen(port, () => {
	console.log(`listening on port ${port}`);
	cronjobs();
});
