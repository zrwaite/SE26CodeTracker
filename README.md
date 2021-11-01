## Code Comparer

### Sign Up:

1. Sign up with test code and email
1. Use test code to get access code
	* If it fails, tell user
	* Otherwise next check:
1. Check if email matches one provided
	* If email doesn't match, tell user
1. Store access token (Json for MVP, mongodb for final)

Figure out how to revoke tokens

### Cron Jobs:
Each day:
1. Get array of tokens
1. For each token, 
	1. Send request to user data: https://wakatime.com/api/v1/users/current
	1. Check for existence of username.json, create if needed and add display_name photo and username
	1. Store filename
	1. Parse Json from filename into user
	1. Pares Json from cohort.json into cohort
	1. Parse Json from day_data.json into day
	1. Parse Json from week_data.json into week
	1. Send request to code data: https://wakatime.com/api/v1/users/current/summaries?start=2021-10-30&end=2021-10-30&timeout=15&writes_only=true
	1. forEach editor in data.editors
		1. name = editor.name
		1. time = editor.total_seconds
		1. forEach pastEditor in user.editors (then cohort.editors)
			1. if name = pastEditor.name, pastEditor.time += time
			1. else user.editors.push({name: name, time: time})
	1. forEach language in data.languages
		1. name = language.name
		1. time = language.total_seconds
		1. 1. forEach pastLanguage in user.languages (then cohort.languages)
			1. if name = pastLanguage.name, pastLanguage.time += time
			1. else user.languages.push({name: name, time: time})
	1. forEach os in data.operating_systems
		1. name = os.name
		1. time = os.total_seconds
		1. 1. forEach pastOS in user.os (then cohort.os)
			1. if name = pastOS.name, pastOS.time += time
			1. else user.os.push({name: name, time: time})
	1. user.stats.push({date: data.range.date, time: cummulative_total.seconds})
	1. day.people.push({username: username, time: time})
	1. forEach person in week.people (don't actually use foreach)
		1. if person.username == username: person.time+=time
		1. if person not found, add them
	1. Write user json to filename
	1. Write cohort json to cohort.json
	1. Write day json to day_data.json
	1. Write week json to week_data.json
1. Create cohort editors pie graph
1. Create cohort languages pie graph
1. Create cohort os pi graph
1. Sort day_data.json by time into day_chart.json
1. Sort week_data.json by time into week_chart.json

Each week: 
1. Wait until after the day cronjob
1. Set time to 0 in week_data.json
1. Add winner to winners.json
1. New winner: username.json: user.wins += 1
1. Discord bot send congrats 

## Endpoints;
* /api/day_chart
	* Returns day_chart.json
* /api/week_chart
	* Returns week_chart.json
* /api/winners
	* Returns winners.json
* /images/*
	* Returns editorsPie.png, languagesPie.png, osPie.png, etc