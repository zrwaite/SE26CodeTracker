const renderPiGraph = (id, type) => {
	let pichart = document.getElementById(id);
	let list = [
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
	]
	list = list.sort((a,b) => (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0));
	let graphGradient = "conic-gradient(";
	let totalTime = 0;
	let lastPerc = 0;
	list.forEach(elem => totalTime+=elem.time);
	for (let i=0; i<list.length; i++) {
		elem = list[i]
		let colour = 'grey';
		let newPerc = lastPerc+Math.round(10000*elem.time/totalTime)/100;
		colour = getColour(elem.name);
		if (newPerc-lastPerc<0.1) {
			graphGradient+=`${i==0?'':','} white ${lastPerc}% 100%`
			break;
		}
		graphGradient+=`${i==0?'':','} ${colour} ${lastPerc}% ${newPerc}%`
		lastPerc = newPerc;
	}
	graphGradient+=")"
	pichart.style.background= graphGradient;
}

const renderPiGraphTable = (id) => {
	let table = document.getElementById(id);
	let list = [
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
	]
	list = list.sort((a,b) => (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0));
	let totalHtml = "";
	let colour="blue";
	let totalTime = 0;
	list.forEach(elem => totalTime+=elem.time);
	list.forEach((elem) => {
		colour = getColour(elem.name);
		let timePerc = Math.round(10000*elem.time/totalTime)/100;
		if (timePerc>=0.1) totalHtml += `<h7><span class="colorIcon" style="background-color: ${colour}"></span>${elem.name} ${timePerc}%</h7>`
	})
	table.innerHTML = totalHtml;
}

const getColour = (name) => {
	switch (name) {
		case "TypeScript": return "#0099ff";
		case "JavaScript": return "#ecec13";
		case "C": return "#666666";
		case "JSON": return "#339933";
		case "PHP": return "#9999ff";
		case "Python": return "#0066cc";
		case "HTML": return "#ff471a";
		case "Docker": return "#1aa3ff";
		case "SQL": return "#e6b800";
		case "Java": return "#e60000";
		case "Rust": return "#ff5c33";
		case "Markdown": return "#333333";
		case "Git Config": return "red";
		default: return "white";
	}
}