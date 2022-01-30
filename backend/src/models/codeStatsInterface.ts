interface dayObject {
	date: string;
	time: number;
    languages: statObject[],
}

interface statObject {
	name: string;
	time: number;
}

interface weekWinners {
	username: string;
	date: Date;
}

interface dayOrder {
	username: string;
}
interface userStats {
	wins: number;
	total_time: number;
	day_time: number;
	week_time: number;
	editors: statObject[],
    languages: statObject[],
    os: statObject[],
    days: dayObject[],
}

interface groupStats {
	week_winners: weekWinners[];
	day_order: dayOrder[]
	total_day_time: number;
	total_week_time: number;
	editors: statObject[];
    languages: statObject[];
    os: statObject[];
    days: dayObject[];
}

export {userStats, statObject, dayObject, groupStats};