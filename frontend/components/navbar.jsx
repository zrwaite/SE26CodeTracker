const Navbar = (id) => {
	const navbar = document.getElementById(id);
	if (!navbar) return;
	navbar.innerHTML = 
	`
	<div class="nav">
		<div class="navItem">
			<p class="navItemText">Stats</p>
		</div>
		<div class="navItem">
			<p class="navItemText">Cohort</p>
		</div>
		<div class="navItem">
			<p class="navItemText">Compete</p>
		</div>
		<div class="navItem">
			<p class="navItemText">Settings</p>
		</div>
	</div>
	`
}