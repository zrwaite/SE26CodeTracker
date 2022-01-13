const Footer = (id) => {
	const footer = document.getElementById(id);
	if (!footer) return;
	footer.innerHTML = 
	`
	<div class="footer">
		<img class="footerLogo" src="../images/logo.svg" alt="logo"/>
		<a target="_blank" href="https://github.com/zrwaite/SE26CodeTracker">
			<button class="footerButton">
				<img src="../images/github.svg" alt="github"/>
				<p>Source <br/> Code</p>
			</button>
		</a>
		<a target="_blank" href="https://github.com/zrwaite">
			<button class="footerButton">
				<img src="../images/zac.png" alt="zac"/>
				<p>Zac <br/> Waite</p>
			</button>
		</a>
	</div>
	`
}