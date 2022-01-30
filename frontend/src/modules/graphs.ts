const allDaysGraph = (id: string, days:any[], maxTime:number) => {
	const graph:any = document.getElementById(id);
	if (!graph) {console.error("graph not found"); return;}
	graph.all = true;

	let maxDayElem = document.getElementById('maxDay');
	if (maxDayElem) maxDayElem.innerText=maxTime.toString();
	else {console.error("maxDay not found"); return;}

	days = days.sort((a,b) => ((new Date(a.date)) > (new Date(b.date))) ? 1 : ((new Date(a.date)) < (new Date(b.date)) ? -1 : 0));
	for (let i=0; i<days.length; i++) {
		let details = document.getElementById("dayStatDetails");
		if (!details) continue;
		let day = days[i];
		let fullBar:any = document.createElement("div");
		let dateString = new Date(day.date);
		dateString.setHours(0, 0, 0, 0);
		dateString.setDate(dateString.getDate() + 1);
		fullBar.date = dateString.toLocaleDateString();
		let piGraphId = createDayPiGraph("dayStatsPiGraphSection", days[i].languages, dateString.toLocaleDateString());
		fullBar.time=toHours(day.time);
		fullBar.style.height="100%";
		fullBar.onmouseout = function() {
			let details = document.getElementById("dayStatDetails");
			if (!details) return;
			details.innerHTML = "<h6>Hover above for more info^</h6>";

			let dayPiGraph = document.getElementById(piGraphId);
			if (!dayPiGraph) return;
			dayPiGraph.style.display = "none";
		}; 
		fullBar.onmouseover=function() {
			let details = document.getElementById("dayStatDetails");
			if (!details) return;
			let dateText = document.createElement("h6");
			let timeText = document.createElement("h6");
			dateText.innerText = `Date: ${this.date}`;
			timeText.innerText = `Time: ${this.time} hours`;
			details.innerHTML = '';
			details.appendChild(dateText);
			details.appendChild(timeText);

			let dayPiGraph = document.getElementById(piGraphId);
			if (!dayPiGraph) return;
			dayPiGraph.style.display = "grid";
		};

		let newBar = document.createElement("div");
		let ratio = Math.round(1000*fullBar.time/maxTime)/1000;
		newBar.style.height=`${9*ratio}rem`;
		if (ratio<0.15) newBar.style.backgroundColor = 'red';
		else if (ratio<0.25) newBar.style.backgroundColor = 'orange';
		else if (ratio<0.4) newBar.style.backgroundColor = 'rgba(200, 220, 0)';
		else newBar.style.backgroundColor = 'green';
		// newBar.style.height=`100%`;
		fullBar.appendChild(newBar);
		graph.appendChild(fullBar);
	}
}

const createDayPiGraph = (parentId:string, list:any[], date:string) => {
	let parent:HTMLElement|null = document.getElementById(parentId);
	if (!parent) console.error("pigraph section not found");
	date = date.replace("-", "").replace("-", "");
	let id = `dayPiGraph${date}`
	let newGraphContainer:any = document.createElement("div");
	newGraphContainer.className = "statsSection dayPiGraphSection";
	newGraphContainer.id = id;

	let newPiGraphContainer:any = document.createElement("div");
	newPiGraphContainer.className="piGraphContainer";

	let newPiGraphTable:any = document.createElement("div");
	newPiGraphTable.className = "piGraphTable";
	newPiGraphTable.id = `languageTable${date}`;

	let newPiGraph:any = document.createElement("div");
	newPiGraph.className="piGraph";
	newPiGraph.id = `languageGraph${date}`;

	newPiGraphContainer.append(newPiGraph);
	newGraphContainer.append(newPiGraphContainer);
	newGraphContainer.append(newPiGraphTable);
	if (parent) parent.append(newGraphContainer);

	renderPiGraph(`languageGraph${date}`, list);
	renderPiGraphTable(`languageTable${date}`, list);
	return id;
}

const reduceBarGraph = (id:string, numDays:number) => {
	const graph:any = document.getElementById(id);
	if (!graph) {console.error("graph not found"); return;}
	const graphSections:any = document.querySelectorAll(`#${id}>div`)
	if (!graphSections) {console.error("graphSections not found"); return;}

	if (graphSections.length>numDays) {
		if (graph.all) {
			for (let i=0; i<graphSections.length - numDays; i++) 
				graphSections[i].style.display="none";
			graph.all=false;
		}
		else {
			for (let i=0; i<graphSections.length - numDays; i++) 
				graphSections[i].style.display="flex";
			graph.all=true;
		}
	}
}

const renderPiGraph = (id:string, list:any[]) => {
	let pichart = document.getElementById(id);
	if (!pichart) {console.error("pichart not found"); return;}
	list = list.sort((a,b) => (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0));
	let graphGradient = "conic-gradient(";
	let totalTime = 0;
	let lastPerc = 0;
	list.forEach(elem => totalTime+=elem.time);
	for (let i=0; i<list.length; i++) {
		let elem = list[i]
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

const renderPiGraphTable = (id:string, list:any[]) => {
	let table = document.getElementById(id);
	if (!table) {console.error("table not found"+id); return;}
	list = list.sort((a,b) => (a.time < b.time) ? 1 : ((b.time < a.time) ? -1 : 0));
	let totalHtml = "";
	let colour="blue";
	let totalTime = 0;
	list.forEach(elem => totalTime+=elem.time);
	list.forEach((elem) => {
		colour = getColour(elem.name);
		let timePerc = Math.round(10000*elem.time/totalTime)/100;
		if (timePerc>=0.1) totalHtml += `<p><span class="colorIcon" style="background-color: ${colour}"></span>${elem.name} ${timePerc}%</p>`
	})
	table.innerHTML = totalHtml;
}

const getColour = (name:string) => {
	switch (name) {
		case "TypeScript": return "#0099ff";
		case "JavaScript": return "#ecec13";
		case "C": return "#666666";
		case "C#": return "#9332bf";
		case "JSON": return "#339933";
		case "PHP": return "#9999ff";
		case "Python": return "#0066cc";
		case "HTML": return "#ff471a";
		case "Docker": return "#1aa3ff";
		case "SQL": return "#e6b800";
		case "Java": return "#e60000";
		case "Dart": return "rgb(23, 174, 255)";
		case "SCSS": return "rgb(201, 85, 146)";
		case "CSS": return "rgb(28, 49, 220)";
		case "Rust": return "#ff5c33";
		case "Racket": return "rgb(100, 13, 20)";
		case "Markdown": return "#333333";
		case "C++": return "rgb(83, 136, 200)";
		case "Git Config": return "red";
		case "VS Code": return "#0099ff";
		case "WebStorm": return "rgb(26, 197, 207)";
		case "PhpStorm": return "rgb(182, 25, 183)";
		case "CLion": return "rgb(32, 210, 110)";
		case "PyCharm": return "rgb(70, 220, 90)";
		case "Rider": return "rgb(184, 0, 74)";
		case "Vim": return "rgb(18, 138, 39)";
		case "Mac": return "rgb(150, 0, 167)";
		case "Linux": return "rgb(223, 167, 20)";
		case "Windows": return "#0099ff";
		default: return "white";
	}
}

const toHours = (seconds:number) => {return  Math.round(100*seconds/3600)/100} 

function renderDetails() {
	let details = document.getElementById("dayStatDetails");
	if (!details) return;
	details.innerHTML = this.id;
	console.log(this.id);
}
const resetDetails = () => {
	let details = document.getElementById("dayStatDetails");
	if (!details) return;
	details.innerHTML = "<p>Hover above for more info^</p>";
}