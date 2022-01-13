const trySignIn = async () => {
	const usernameInput:HTMLInputElement|null = document.querySelector("#username");
	const passwordInput:HTMLInputElement|null = document.querySelector("#password");
	let username, password;
	if (usernameInput) {
		username = usernameInput.value;
		if (!usernameInput.checkValidity()) return;
	} else {console.error("username element not found"); return;}
	if (passwordInput) {
		password = passwordInput.value;
		if (!passwordInput.checkValidity()) return;
	} else {console.error("password element not found"); return;}
	if (username===''||password=='') return;
	usernameInput.readOnly = true;
	passwordInput.readOnly = true;
	let json = await httpReq("/auth/signin", "POST", {
		username: username,
		password: password,
	});
	let res = document.getElementById("response");
	if (!res) return;
	if (json) {
		const data = JSON.parse(json);
		if (data.success) {
			setCookie("username", username);
			setCookie("token", data.response.token);
			window.location.href= "../stats";
		} else {
			alert(data.errors);
		}
		res.innerHTML = json;
	} else res.innerHTML = "SIGN IN ERROR";
	usernameInput.readOnly = false;
	passwordInput.readOnly = false;
}