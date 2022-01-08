const Navbar = (id) => {
	const navbar = document.getElementById(id);
	if (!navbar) return;
	navbar.innerHTML = 
	`	
	<div class="nav">
		<a href="../stats">
			<button class="navItem">
				<img src="../images/graph.svg"></img>
				<p class="navItemText">Stats</p>
			</button>
		</a>
		<a href="../cohort">
			<button class="navItem">
				<img src="../images/group.svg"></img>
				<p class="navItemText">Cohort</p>
			</button>
		</a>
		<a href="../competitions">
			<button class="navItem">
				<img src="../images/trophy.svg"></img>
				<p class="navItemText">Compete</p>
			</button>
		</a>
		<a class="navItemRight" href="../settings">
			<button class="navItem">
				<img src="../images/settings.svg"></img>
			</button>
		</a>
	</div>
	`
}