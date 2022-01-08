const Footer = (id) => {
	const footer = document.getElementById(id);
	if (!footer) return;
	footer.innerHTML = 
	`
	<div class="footer">
		<img class="footerLogo" src="../images/logo.svg"></img>
		<a target="_blank" href="https://github.com/zrwaite/SE26CodeTracker">
			<button class="footerButton">
				<img src="../images/github.svg"></img>
				<p>Source <br/> Code</p>
			</button>
		</a>
		<a target="_blank" href="https://github.com/zrwaite">
			<button class="footerButton">
				<img src="../images/zac.png"></img>
				<p>Zac <br/> Waite</p>
			</button>
		</a>
	</div>
	`
}