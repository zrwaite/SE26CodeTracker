const renderStats = async () => {
	try {
		const json = await httpReq(`/api/user?username=${getCookie("username")}`, true);
		if (!json) return;
		const data = JSON.parse(json);
		if (data.success) {
			const result = data.response;
			if (!result.initialized) {
				const initializingSection = document.getElementById("initializingSection");
				if (!initializingSection) return;
				initializingSection.style.display = "block";
				setTimeout(renderStats, 2000);
				return;
			} else {
				const initializingSection = document.getElementById("initializingSection");
				if (!initializingSection) return;
				initializingSection.style.display = "none";
			}
			const days:any[] = result.stats.days;
			const languages = result.stats.languages;
			const editors = result.stats.editors;
			const os = result.stats.os;
			const totalSeconds = result.stats.total_time;
			let maxTime = 0;
			days.forEach((day) => {if(day.time>maxTime) maxTime = day.time;})
			maxTime = toHours(maxTime);
			statsHeaderTable(days, totalSeconds, maxTime);
			allDaysGraph("barGraph", days, maxTime);
			renderPiGraph('languageGraph', languages);
			renderPiGraphTable('languageTable', languages);
			renderPiGraph('codeEditorsGraph', editors);
			renderPiGraphTable('codeEditorsTable', editors);
			renderPiGraph('osGraph', os);
			renderPiGraphTable('osTable', os);
		} else {
			console.log(data.errors);
		}
	} catch (e) {
		console.log("something went wrong", e);
	}
}

const statsHeaderTable = (days:any[], totalSeconds:number, maxTime:number) => {
	let totalHours = toHours(totalSeconds);

	let highestDayElem = document.getElementById('highestDay');
	if (highestDayElem) highestDayElem.innerText=maxTime.toString();
	else {console.error("highestDay not found"); return;}

	let averageDayElem = document.getElementById('averageDay');
	if (averageDayElem) averageDayElem.innerText=toHours(totalSeconds/days.length).toString();
	else {console.error("averageDay not found"); return;}

	let totalTimeElem = document.getElementById('totalTime');
	if (totalTimeElem) totalTimeElem.innerText=totalHours.toString();
	else {console.error("totalTime not found"); return;}
}