import {stats, dayObject} from "../models/codeStatsInterface"
interface apiStats {
	name:string;
	total_seconds: number
}
const createCodeStats = async (allStats:any[]) =>{
	console.log(JSON.stringify(allStats[0]));
	const codeStats:stats = {
		wins: 0,
		total_time: 0,
		day_time: 0,
		week_time: 0,
		editors: [],
		languages: [],
		os: [],
		days: []
	}
	let found = false;
	for (let numDay=0; numDay<allStats.length; numDay++){
		const day = allStats[numDay];
		const currentDate:string = day.range.date;
		const dayStats:dayObject = {
			time: 0,
			date: currentDate
		}
		codeStats.day_time=0;
		day.editors.forEach((editor:apiStats)=>{
			let name = editor.name;
			let time = editor.total_seconds;
			found = false;
			for (let i=0; i<codeStats.editors.length; i++){
				if (name != codeStats.editors[i].name) continue;
				codeStats.editors[i].time += time;
				found = true;
				break;
			} 
			if (!found) codeStats.editors.push({name:name, time:time});
		})
		day.languages.forEach((language:apiStats)=>{
			let name = language.name;
			let time = language.total_seconds;
			dayStats.time+=time;
			found = false;
			for (let i=0; i<codeStats.languages.length; i++){
				if (name != codeStats.languages[i].name) continue;
				codeStats.languages[i].time += time;
				found = true;
				break;
			} 
			if (!found) codeStats.languages.push({name:name, time:time});
		})
		day.operating_systems.forEach((os:apiStats)=>{
			let name = os.name;
			let time = os.total_seconds;
			found = false;
			for (let i=0; i<codeStats.os.length; i++){
				if (name != codeStats.os[i].name) continue;
				codeStats.os[i].time += time;
				found = true;
				break;
			} 
			if (!found) codeStats.os.push({name:name, time:time});
		})
		codeStats.total_time+=dayStats.time;
		codeStats.days.push(dayStats);
		if (allStats.length-1 <= numDay) codeStats.day_time = dayStats.time;
		if (allStats.length-7 <= numDay) codeStats.week_time += dayStats.time;
	}
	return codeStats;
}

export {createCodeStats};