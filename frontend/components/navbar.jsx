const Navbar = (id) => {
	const navbar = document.getElementById(id);
	if (!navbar) return;
	navbar.innerHTML = 
	`	
	<div class="nav">
		<a href="./stats">
			<div class="navItem">
				<img src="images/graph.svg"></img>
				<p class="navItemText">Stats</p>
			</div>
		</a>
		<a href="./cohort">
			<div class="navItem">
				<img src="images/group.svg"></img>
				<p class="navItemText">Cohort</p>
			</div>
		</a>
		<a href="./competitions">
			<div class="navItem">
				<img src="images/trophy.svg"></img>
				<p class="navItemText">Compete</p>
			</div>
		</a>
		<a class="navItemRight" href="./settings">
			<div class="navItem">
				<img src="images/settings.svg"></img>
			</div>
		</a>
	</div>
	`
}