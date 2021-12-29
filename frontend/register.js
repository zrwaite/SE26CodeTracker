const tryRegister = async () => {
	let res = document.getElementById("response");
	let emailInput = document.getElementById("email");
	let codeInput = document.getElementById("code");

	let email = emailInput.value;
	let code = codeInput.value;

	if (email===''||code==='') return;
	if (!emailInput.checkValidity()) return;
	if (!codeInput.checkValidity()) return;

	let jsonResponse = await httpReq("/api/user", "POST", {
		email: email,
		code: code
	});
	if (jsonResponse) res.innerHTML = JSON.parse(jsonResponse);
	else res.innerHTML = "ERROR";
}
