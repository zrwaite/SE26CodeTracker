const trySignUp = async () => {
	const usernameInput:HTMLInputElement|null = document.querySelector("#username");
	const emailInput:HTMLInputElement|null = document.querySelector("#email");
	const passwordInput:HTMLInputElement|null = document.querySelector("#password");
	const codeInput:HTMLInputElement|null = document.querySelector("#code");
	let username, email, code, password;
	if (usernameInput) {
		username = usernameInput.value;
		if (!usernameInput.checkValidity()) return;
	}
	if (emailInput) {
		email = emailInput.value;
		if (!emailInput.checkValidity()) return;
	}
	if (codeInput) {
		code = codeInput.value;
		if (!codeInput.checkValidity()) return;
	} 
	if (passwordInput) {
		password = passwordInput.value;
		if (!passwordInput.checkValidity()) return;
	}
	if (username===''||code===''||password==''||email=='') return;
	let json = await httpReq("/api/user", "POST", {
		username: username,
		password: password,
		email: email,
		code: code
	});
	let res = document.getElementById("response");
	if (!res) return;
	if (json) {
		res.innerHTML = json;
	}
	else res.innerHTML = "ERROR";
}

const expand = (index:number) => {
	let sectionId = `stepSection${index}`;
	let iconId = `stepIcon${index}`;
	let section = document.getElementById(sectionId);
	let icon:any = document.getElementById(iconId);
	if (!section || !icon) return;
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