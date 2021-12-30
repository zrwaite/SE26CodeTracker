interface dayObject {
	date: string;
	time: number;
}

interface statObject {
	name: string;
	time: number;
}

interface stats {
	wins: number;
	total_time: number;
	day_time: number;
	week_time: number;
	editors: statObject[],
    languages: statObject[],
    os: statObject[],
    days: dayObject[],
}
export {stats, statObject, dayObject};