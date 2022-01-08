const Navbar = (id, type) => {
	const navbar = document.getElementById(id);
	if (!navbar) return;
	let navVar = [
		{
			link: "../stats",
			image: "../images/graph.svg",
			text: "Stats"
		},
		{
			link: "../cohort",
			image: "../images/group.svg",
			text: "Cohort"
		},
		{
			link: "../competitions",
			image: "../images/trophy.svg",
			text: "Compete"
		},
	]
	if (type=="home"){
		navVar = [
			{
				link: "../home",
				image: "../images/logo.svg",
				text: "Home",
				color: true
			},
			{
				link: "../signin",
				image: "../images/login.svg",
				text: "Signin"
			},
			{
				link: "../signup",
				image: "../images/add_account.svg",
				text: "Signup"
			}
		]
	} 
	let innerHtml = `<div class="nav">`;
	navVar.forEach((button) => {
		innerHtml+=`
			<a href=${button.link}>
				<button class="navItem">
					<img class="navIcon ${button.color || "whiteShift"}" src=${button.image}></img>
					<p class="navItemText">${button.text}</p>
				</button>
			</a>
		`
	})
	innerHtml += `
		<a class="navItemRight" href="../settings">
			<button class="navItem">
				<img class="navIcon whiteShift" src="../images/settings.svg"></img>
			</button>
		</a>
	</div>
	`
	navbar.innerHTML = innerHtml
}