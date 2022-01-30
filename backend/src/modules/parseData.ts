import {userStats, groupStats, dayObject, statObject} from "../models/codeStatsInterface"
interface apiStats {
	name:string;
	total_seconds: number
}

// const parseDayStats = async (all
const parseDayStats = async (day:any, startingStats:userStats = {
	wins: 0,
	total_time: 0,
	day_time: 0,
	week_time: 0,
	editors: [],
	languages: [],
	os: [],
	days: []
}, addDay:boolean = false, addWeek:boolean = false, removeWeek:boolean) => {
	const currentDate:string = day.range.date;
	const dayStats:dayObject = {
		time: 0,
		date: currentDate,
		languages: []
	}
	startingStats.day_time=0;
	day.editors.forEach((editor:apiStats)=>{
		let name = editor.name;
		let time = editor.total_seconds;
		let found = false;
		for (let i=0; i<startingStats.editors.length; i++){
			if (name != startingStats.editors[i].name) continue;
			startingStats.editors[i].time += time;
			found = true;
			break;
		} 
		if (!found) startingStats.editors.push({name:name, time:time});
	})
	day.languages.forEach((language:apiStats)=>{
		let name = language.name;
		let time = language.total_seconds;
		let found = false;
		for (let i=0; i<startingStats.languages.length; i++){
			if (name != startingStats.languages[i].name) continue;
			startingStats.languages[i].time += time;
			found = true;
			break;
		} 
		dayStats.languages.push({name:name, time:time});
		if (!found) startingStats.languages.push({name:name, time:time});
	})
	day.operating_systems.forEach((os:apiStats)=>{
		let name = os.name;
		let time = os.total_seconds;
		dayStats.time+=time;
		let found = false;
		for (let i=0; i<startingStats.os.length; i++){
			if (name != startingStats.os[i].name) continue;
			startingStats.os[i].time += time;
			found = true;
			break;
		} 
		if (!found) startingStats.os.push({name:name, time:time});
	})
	startingStats.total_time+=dayStats.time;
	startingStats.days.push(dayStats);
	if (addDay) startingStats.day_time = dayStats.time;
	if (addWeek) startingStats.week_time += dayStats.time;
	if (removeWeek && startingStats.days.length>7) startingStats.week_time -= startingStats.days[startingStats.days.length-7].time
	return startingStats;
}
const createCodeStats = async (allStats:any[]) =>{
	let codeStats:userStats = {
		wins: 0,
		total_time: 0,
		day_time: 0,
		week_time: 0,
		editors: [],
		languages: [],
		os: [],
		days: []
	}
	for (let numDay=0; numDay<allStats.length; numDay++){
		const day = allStats[numDay];
		codeStats = await parseDayStats(day, codeStats, (allStats.length-1 <= numDay), (allStats.length-7 <= numDay), false);
	}
	return codeStats;
}

const mergeGroupData = async (users:any[]) => {
	let mergedStats:groupStats = {
		week_winners: [],
		day_order: [],
		total_day_time: 0,
		total_week_time: 0,
		editors: [],
		languages: [],
		os: [],
		days: [],
	}
	users.forEach((user) => {
		mergedStats.total_day_time += user.stats.day_time;
		mergedStats.total_week_time += user.stats.week_time;
		user.stats.editors.forEach((editor:any)=>{
			let name = editor.name;
			let time = editor.time;
			let found = false;
			for (let i=0; i<mergedStats.editors.length; i++){
				if (name != mergedStats.editors[i].name) continue;
				mergedStats.editors[i].time += time;
				found = true;
				break;
			} 
			if (!found) mergedStats.editors.push({name:name, time:time});
		})
		user.stats.languages.forEach((language:any)=>{
			let name = language.name;
			let time = language.time;
			let found = false;
			for (let i=0; i<mergedStats.languages.length; i++){
				if (name != mergedStats.languages[i].name) continue;
				mergedStats.languages[i].time += time;
				found = true;
				break;
			} 
			if (!found) mergedStats.languages.push({name:name, time:time});
		})
		user.stats.os.forEach((os:any)=>{
			let name = os.name;
			let time = os.time;
			let found = false;
			for (let i=0; i<mergedStats.os.length; i++){
				if (name != mergedStats.os[i].name) continue;
				mergedStats.os[i].time += time;
				found = true;
				break;
			} 
			if (!found) mergedStats.os.push({name:name, time:time});
		})
		user.stats.days.forEach((day:any) => {
			let date = day.date.toLocaleDateString();
			let time = day.time;
			let found = false;
			for (let i=0; i<mergedStats.days.length; i++){
				if (date !== mergedStats.days[i].date) continue;
				mergedStats.days[i].time += time;
				found = true;
				break;
			} 
			let languages:statObject[] = [];
			day.languages.forEach((language:any)=>{
				let dayLanguageName = language.name;
				let dayLanguageTime = language.time;
				let found = false;
				for (let i=0; i<languages.length; i++){
					if (dayLanguageName != languages[i].name) continue;
					languages[i].time += dayLanguageTime;
					found = true;
					break;
				} 
				if (!found) languages.push({name:dayLanguageName, time:dayLanguageTime});
			})
			if (!found) mergedStats.days.push({date:date, time:time, languages:languages});
		})
	});
	return mergedStats;
}
/*
startingStats
*/

export {createCodeStats, parseDayStats, mergeGroupData};