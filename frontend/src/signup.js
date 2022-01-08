const trySignUp = async () => {
	let res = document.getElementById("response");
	const usernameInput = document.getElementById("username");
	const passwordInput = document.getElementById("password");
	const codeInput = document.getElementById("code");

	const username = usernameInput.value;
	const code = codeInput.value;
	const password = passwordInput.value;

	if (username===''||code===''||password=='') return;
	if (!usernameInput.checkValidity()) return;
	if (!passwordInput.checkValidity()) return;
	if (!codeInput.checkValidity()) return;
	let jsonResponse = await httpReq("/api/user", "POST", {
		username: username,
		password: password,
		code: code
	});
	if (jsonResponse) res.innerHTML = jsonResponse;
	else res.innerHTML = "ERROR";
}

const expand = (index) => {
	let sectionId = `stepSection${index}`;
	let iconId = `stepIcon${index}`;
	let section = document.getElementById(sectionId);
	let icon = document.getElementById(iconId);
	if (icon.flipped) {
		icon.style.transform = "rotate(0deg)"
		icon.flipped = false;
		section.style.display = "none"
	} else {
		icon.flipped = true;
		icon.style.transform = "rotate(180deg)"
		section.style.display = "block";
	}
}