const renderGroupStats = async () => {
	try {
		const json = await httpReq(`/api/group?id=61e76892e7a49606acfb7de5`);
		if (!json) return;
		const data = JSON.parse(json);
		if (data.success) {
			const result = data.response;
			const days:any[] = result.stats.days;
			const languages = result.stats.languages;
			const editors = result.stats.editors;
			const os = result.stats.os;
			const totalDayTime = result.stats.total_day_time;
			const totalWeekTime = result.stats.total_week_time;
			let maxTime = 0;
			days.forEach((day) => {if(day.time>maxTime) maxTime = day.time;})
			maxTime = toHours(maxTime);
			groupHeaderTable(totalWeekTime, totalDayTime);
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

const groupHeaderTable = (totalWeekTime:number, totalDayTime:number) => {
	let totalDayTimeElem = document.getElementById('totalDayTime');
	if (totalDayTimeElem) totalDayTimeElem.innerText=toHours(totalDayTime).toString();
	else {console.error("totalDayTime not found"); return;}

	let totalWeekTimeElem = document.getElementById('totalWeekTime');
	if (totalWeekTimeElem) totalWeekTimeElem.innerText=toHours(totalWeekTime).toString();
	else {console.error("averageDay not found"); return;}
}