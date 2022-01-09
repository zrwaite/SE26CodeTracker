const renderDetails = () => {
	let details = document.getElementById("dayStatDetails");
	details.innerHTML = this.id;
	console.log(this.id);
}
const resetDetails = () => {
	let details = document.getElementById("dayStatDetails");
	details.innerHTML = "<p>Hover above for more info^</p>";
}

const toHours = (seconds) => {return  Math.round(100*seconds/3600)/100}

const data = {
	"_id": "61d1e091ddaaba856ca889e2",
	"access_token": "sec_lmoI3LbukyBjtXVtYzlSGcsJyDXhtg89L3B7stat2Cfz1mUerTpsI7MnAFNhhHIUn0BdtE9N1b6JE6mU",
	"refresh_token": "ref_4lX0x1fYnnSviYWHSOBSBlZuguKgagjvinFPE6dEx6LBcy4ZcjPAwg8Z88CRNkTfWrY6x7BiNnXK9IPK",
	"email": "129032699zw@gmail.com",
	"created_at": "2021-10-12T13:31:55Z",
	"display_name": "Zac Waite",
	"username": "Insomnizac",
	"initialized": true,
	"hash": "$2b$10$.oTgnCdUCK/nLs4OJZphw.2TqLTzYHeNqL5i7/vBEUpm41qK/xVjm",
	"stats": {
		"wins": 0,
		"total_time": 1083993.1547019996,
		"day_time": 16621.918264,
		"week_time": 44695.510097,
		"editors": [
			{
				"name": "VS Code",
				"time": 896599.695663
			},
			{
				"name": "Bash",
				"time": 711.3619980000001
			},
			{
				"name": "PhpStorm",
				"time": 78512.00029899999
			},
			{
				"name": "WebStorm",
				"time": 108170.096742
			}
		],
		"languages": [
			{
				"name": "TypeScript",
				"time": 350418.59384899994
			},
			{
				"name": "JSON",
				"time": 39959.503334000015
			},
			{
				"name": "Markdown",
				"time": 30449.162599000003
			},
			{
				"name": "Docker",
				"time": 3514.2508039999993
			},
			{
				"name": "JavaScript",
				"time": 229593.77277600003
			},
			{
				"name": "Other",
				"time": 3169.9190790000007
			},
			{
				"name": "C#",
				"time": 85.978523
			},
			{
				"name": "PHP",
				"time": 135880.49140099998
			},
			{
				"name": "Bash",
				"time": 8768.411062
			},
			{
				"name": "Git Config",
				"time": 4223.591731
			},
			{
				"name": "HTML",
				"time": 20211.809302
			},
			{
				"name": "XML",
				"time": 693.5440570000001
			},
			{
				"name": "YAML",
				"time": 1144.76844
			},
			{
				"name": "CSS",
				"time": 25379.007035000002
			},
			{
				"name": "C",
				"time": 178109.376937
			},
			{
				"name": "Java",
				"time": 2497.93208
			},
			{
				"name": "SQL",
				"time": 5652.137715000001
			},
			{
				"name": "Apache Config",
				"time": 550.1691129999999
			},
			{
				"name": "Python",
				"time": 27645.200916
			},
			{
				"name": "Objective-C",
				"time": 838.291403
			},
			{
				"name": "Arduino",
				"time": 1.335469
			},
			{
				"name": "Rust",
				"time": 9446.259022999999
			},
			{
				"name": "TOML",
				"time": 853.175629
			},
			{
				"name": "Text",
				"time": 3725.48373
			},
			{
				"name": "Perl",
				"time": 5.83361
			},
			{
				"name": "INI",
				"time": 610.176085
			},
			{
				"name": "htaccess",
				"time": 21.985
			},
			{
				"name": "GitIgnore file",
				"time": 305.146
			},
			{
				"name": "IDEA_MODULE",
				"time": 38.639
			},
			{
				"name": "SVG",
				"time": 150.602
			},
			{
				"name": "yarn.lock",
				"time": 39.772000000000006
			},
			{
				"name": "textmate",
				"time": 0.204
			},
			{
				"name": "SourceMap",
				"time": 8.631
			}
		],
		"os": [
			{
				"name": "Mac",
				"time": 1044063.2680939999
			},
			{
				"name": "Linux",
				"time": 39929.88660800001
			}
		],
		"days": [
			{
				"date": "2021-10-12T00:00:00.000Z",
				"time": 5212.3568860000005
			},
			{
				"date": "2021-10-13T00:00:00.000Z",
				"time": 8325.293088
			},
			{
				"date": "2021-10-14T00:00:00.000Z",
				"time": 4474.895769999999
			},
			{
				"date": "2021-10-15T00:00:00.000Z",
				"time": 3867.446751
			},
			{
				"date": "2021-10-16T00:00:00.000Z",
				"time": 15781.329748
			},
			{
				"date": "2021-10-17T00:00:00.000Z",
				"time": 4133.73944
			},
			{
				"date": "2021-10-18T00:00:00.000Z",
				"time": 4675.442647
			},
			{
				"date": "2021-10-19T00:00:00.000Z",
				"time": 16131.200886000002
			},
			{
				"date": "2021-10-20T00:00:00.000Z",
				"time": 5679.425370000001
			},
			{
				"date": "2021-10-21T00:00:00.000Z",
				"time": 11758.593644
			},
			{
				"date": "2021-10-22T00:00:00.000Z",
				"time": 7488.512908
			},
			{
				"date": "2021-10-23T00:00:00.000Z",
				"time": 22432.800646999996
			},
			{
				"date": "2021-10-24T00:00:00.000Z",
				"time": 3.329092
			},
			{
				"date": "2021-10-25T00:00:00.000Z",
				"time": 46.300403
			},
			{
				"date": "2021-10-26T00:00:00.000Z",
				"time": 8740.114807
			},
			{
				"date": "2021-10-27T00:00:00.000Z",
				"time": 3610.265522
			},
			{
				"date": "2021-10-28T00:00:00.000Z",
				"time": 0
			},
			{
				"date": "2021-10-29T00:00:00.000Z",
				"time": 3740.9268940000006
			},
			{
				"date": "2021-10-30T00:00:00.000Z",
				"time": 6239.342248999999
			},
			{
				"date": "2021-10-31T00:00:00.000Z",
				"time": 7590.615989000001
			},
			{
				"date": "2021-11-01T00:00:00.000Z",
				"time": 11026.061134
			},
			{
				"date": "2021-11-02T00:00:00.000Z",
				"time": 25082.974245
			},
			{
				"date": "2021-11-03T00:00:00.000Z",
				"time": 9100.410257
			},
			{
				"date": "2021-11-04T00:00:00.000Z",
				"time": 8356.625667
			},
			{
				"date": "2021-11-05T00:00:00.000Z",
				"time": 9094.292223999999
			},
			{
				"date": "2021-11-06T00:00:00.000Z",
				"time": 18710.02564
			},
			{
				"date": "2021-11-07T00:00:00.000Z",
				"time": 22828.388259999996
			},
			{
				"date": "2021-11-08T00:00:00.000Z",
				"time": 12022.855090000003
			},
			{
				"date": "2021-11-09T00:00:00.000Z",
				"time": 19455.812406
			},
			{
				"date": "2021-11-10T00:00:00.000Z",
				"time": 15998.289771
			},
			{
				"date": "2021-11-11T00:00:00.000Z",
				"time": 2219.8787930000003
			},
			{
				"date": "2021-11-12T00:00:00.000Z",
				"time": 2635.2219170000003
			},
			{
				"date": "2021-11-13T00:00:00.000Z",
				"time": 19455.027353999998
			},
			{
				"date": "2021-11-14T00:00:00.000Z",
				"time": 18246.328189999997
			},
			{
				"date": "2021-11-15T00:00:00.000Z",
				"time": 16288.735055000001
			},
			{
				"date": "2021-11-16T00:00:00.000Z",
				"time": 17661.678595
			},
			{
				"date": "2021-11-17T00:00:00.000Z",
				"time": 5867.192771
			},
			{
				"date": "2021-11-18T00:00:00.000Z",
				"time": 13995.365274
			},
			{
				"date": "2021-11-19T00:00:00.000Z",
				"time": 10410.659145000001
			},
			{
				"date": "2021-11-20T00:00:00.000Z",
				"time": 32679.868179
			},
			{
				"date": "2021-11-21T00:00:00.000Z",
				"time": 12985.239346
			},
			{
				"date": "2021-11-22T00:00:00.000Z",
				"time": 1520.529189
			},
			{
				"date": "2021-11-23T00:00:00.000Z",
				"time": 22812.683451000004
			},
			{
				"date": "2021-11-24T00:00:00.000Z",
				"time": 19300.03554499999
			},
			{
				"date": "2021-11-25T00:00:00.000Z",
				"time": 25404.114740999994
			},
			{
				"date": "2021-11-26T00:00:00.000Z",
				"time": 6797.5161849999995
			},
			{
				"date": "2021-11-27T00:00:00.000Z",
				"time": 36001.111391
			},
			{
				"date": "2021-11-28T00:00:00.000Z",
				"time": 9219.470377999998
			},
			{
				"date": "2021-11-29T00:00:00.000Z",
				"time": 16457.287824
			},
			{
				"date": "2021-11-30T00:00:00.000Z",
				"time": 21424.591523
			},
			{
				"date": "2021-12-01T00:00:00.000Z",
				"time": 25846.591025000005
			},
			{
				"date": "2021-12-02T00:00:00.000Z",
				"time": 22284.044298999997
			},
			{
				"date": "2021-12-03T00:00:00.000Z",
				"time": 9659.230381000001
			},
			{
				"date": "2021-12-04T00:00:00.000Z",
				"time": 1884.96641
			},
			{
				"date": "2021-12-05T00:00:00.000Z",
				"time": 8378.339188
			},
			{
				"date": "2021-12-06T00:00:00.000Z",
				"time": 6604.244772
			},
			{
				"date": "2021-12-07T00:00:00.000Z",
				"time": 15046.763073
			},
			{
				"date": "2021-12-08T00:00:00.000Z",
				"time": 10546.291457999998
			},
			{
				"date": "2021-12-09T00:00:00.000Z",
				"time": 10650.797000000002
			},
			{
				"date": "2021-12-10T00:00:00.000Z",
				"time": 17680.859687
			},
			{
				"date": "2021-12-11T00:00:00.000Z",
				"time": 26292.502688
			},
			{
				"date": "2021-12-12T00:00:00.000Z",
				"time": 16512.371504
			},
			{
				"date": "2021-12-13T00:00:00.000Z",
				"time": 20578.218095
			},
			{
				"date": "2021-12-14T00:00:00.000Z",
				"time": 30759.970771000004
			},
			{
				"date": "2021-12-15T00:00:00.000Z",
				"time": 31160.962082
			},
			{
				"date": "2021-12-16T00:00:00.000Z",
				"time": 18817.815147
			},
			{
				"date": "2021-12-17T00:00:00.000Z",
				"time": 10212.096892000001
			},
			{
				"date": "2021-12-18T00:00:00.000Z",
				"time": 18093.685415000004
			},
			{
				"date": "2021-12-19T00:00:00.000Z",
				"time": 917.654
			},
			{
				"date": "2021-12-20T00:00:00.000Z",
				"time": 18735.612000000005
			},
			{
				"date": "2021-12-21T00:00:00.000Z",
				"time": 21237.109
			},
			{
				"date": "2021-12-22T00:00:00.000Z",
				"time": 1107.2287430000001
			},
			{
				"date": "2021-12-23T00:00:00.000Z",
				"time": 3525.532837
			},
			{
				"date": "2021-12-24T00:00:00.000Z",
				"time": 12605.938893999999
			},
			{
				"date": "2021-12-25T00:00:00.000Z",
				"time": 22012.635714999997
			},
			{
				"date": "2021-12-26T00:00:00.000Z",
				"time": 9450.348143000001
			},
			{
				"date": "2021-12-27T00:00:00.000Z",
				"time": 34.678902
			},
			{
				"date": "2021-12-28T00:00:00.000Z",
				"time": 13556.941822
			},
			{
				"date": "2021-12-29T00:00:00.000Z",
				"time": 11992.371026
			},
			{
				"date": "2021-12-30T00:00:00.000Z",
				"time": 2140.392217
			},
			{
				"date": "2021-12-31T00:00:00.000Z",
				"time": 13678.760183
			},
			{
				"date": "2022-01-01T00:00:00.000Z",
				"time": 4302.488955
			},
			{
				"date": "2022-01-02T00:00:00.000Z",
				"time": 10868.991181
			},
			{
				"date": "2022-01-03T00:00:00.000Z",
				"time": 3992.404552
			},
			{
				"date": "2022-01-04T00:00:00.000Z",
				"time": 1848.158439
			},
			{
				"date": "2022-01-05T00:00:00.000Z",
				"time": 1297.6103
			},
			{
				"date": "2022-01-06T00:00:00.000Z",
				"time": 6118.317323000001
			},
			{
				"date": "2022-01-07T00:00:00.000Z",
				"time": 3948.1100379999993
			},
			{
				"date": "2022-01-08T00:00:00.000Z",
				"time": 16621.918264
			}
		]
	},
	"__v": 0
}

const days = data.stats.days;
const totalSeconds = data.stats.total_time;
// const days = 
// [{
// 	"date": "2021-10-12T00:00:00.000Z",
// 	"time": 5212.3568860000005
// },
// {
// 	"date": "2021-10-13T00:00:00.000Z",
// 	"time": 8325.293088
// },
// {
// 	"date": "2021-10-14T00:00:00.000Z",
// 	"time": 4474.895769999999
// },
// {
// 	"date": "2021-10-15T00:00:00.000Z",
// 	"time": 3867.446751
// },
// {
// 	"date": "2021-10-16T00:00:00.000Z",
// 	"time": 15781.329748
// },
// {
// 	"date": "2021-10-17T00:00:00.000Z",
// 	"time": 4133.73944
// },
// {
// 	"date": "2021-10-18T00:00:00.000Z",
// 	"time": 4675.442647
// },
// {
// 	"date": "2021-10-19T00:00:00.000Z",
// 	"time": 16131.200886000002
// },
// {
// 	"date": "2021-10-20T00:00:00.000Z",
// 	"time": 5679.425370000001
// },
// {
// 	"date": "2021-10-21T00:00:00.000Z",
// 	"time": 11758.593644
// },
// {
// 	"date": "2021-10-22T00:00:00.000Z",
// 	"time": 7488.512908
// },
// {
// 	"date": "2021-10-23T00:00:00.000Z",
// 	"time": 22432.800646999996
// },
// {
// 	"date": "2021-10-24T00:00:00.000Z",
// 	"time": 3.329092
// },
// {
// 	"date": "2021-10-25T00:00:00.000Z",
// 	"time": 46.300403
// },
// {
// 	"date": "2021-10-26T00:00:00.000Z",
// 	"time": 8740.114807
// },
// {
// 	"date": "2021-10-27T00:00:00.000Z",
// 	"time": 3610.265522
// },
// {
// 	"date": "2021-10-28T00:00:00.000Z",
// 	"time": 0
// },
// {
// 	"date": "2021-10-29T00:00:00.000Z",
// 	"time": 3740.9268940000006
// },
// {
// 	"date": "2021-10-30T00:00:00.000Z",
// 	"time": 6239.342248999999
// },
// {
// 	"date": "2021-10-31T00:00:00.000Z",
// 	"time": 7590.615989000001
// },
// {
// 	"date": "2021-11-01T00:00:00.000Z",
// 	"time": 11026.061134
// },
// {
// 	"date": "2021-11-02T00:00:00.000Z",
// 	"time": 25082.974245
// },
// {
// 	"date": "2021-11-03T00:00:00.000Z",
// 	"time": 9100.410257
// },
// {
// 	"date": "2021-11-04T00:00:00.000Z",
// 	"time": 8356.625667
// },
// {
// 	"date": "2021-11-05T00:00:00.000Z",
// 	"time": 9094.292223999999
// },
// {
// 	"date": "2021-11-06T00:00:00.000Z",
// 	"time": 18710.02564
// },
// {
// 	"date": "2021-11-07T00:00:00.000Z",
// 	"time": 22828.388259999996
// },
// {
// 	"date": "2021-11-08T00:00:00.000Z",
// 	"time": 12022.855090000003
// }]

const allDaysGraph = () => {
	const graph = document.getElementById("barGraph");
	let maxTime = 0;
	days.forEach((day) => {if(day.time>maxTime) maxTime = day.time;})
	maxTime = toHours(maxTime);
	let totalHours = toHours(totalSeconds);
	document.getElementById('maxDay').innerText=maxTime;
	document.getElementById('highestDay').innerText=maxTime;
	document.getElementById('averageDay').innerText=toHours(totalSeconds/days.length);
	document.getElementById('totalTime').innerText=totalHours;


	for (let i=0; i<days.length; i++) {
		let day = days[i];
		let fullBar = document.createElement("div");
		let dateString = new Date(day.date);
		dateString.setHours(0, 0, 0, 0);
		dateString.setDate(dateString.getDate() + 1);
		fullBar.date = dateString.toLocaleDateString();
		fullBar.time=toHours(day.time);
		fullBar.style.height="100%";
		fullBar.onmouseout = function() {
			let details = document.getElementById("dayStatDetails");
			details.innerHTML = "<h6>Hover above for more info^</h6>";
		}; 
		fullBar.onmouseover=function() {
			let details = document.getElementById("dayStatDetails");
			var dateText = document.createElement("h6");
			var timeText = document.createElement("h6");
			dateText.innerText = `Date: ${this.date}`;
			timeText.innerText = `Time: ${this.time} hours`;
			details.innerHTML = '';
			details.appendChild(dateText);
			details.appendChild(timeText);
		}; ;		

		let newBar = document.createElement("div");
		let ratio = Math.round(1000*fullBar.time/maxTime)/1000;
		newBar.style.height=`${9*ratio}rem`;
		if (ratio<0.2) newBar.style.backgroundColor = 'red';
		else if (ratio<0.4) newBar.style.backgroundColor = 'orange';
		else if (ratio<0.6) newBar.style.backgroundColor = 'rgba(200, 220, 0)';
		else newBar.style.backgroundColor = 'green';
		// newBar.style.height=`100%`;
		fullBar.appendChild(newBar);
		graph.appendChild(fullBar);
	}
	days.forEach((day) => {
		
	})
}