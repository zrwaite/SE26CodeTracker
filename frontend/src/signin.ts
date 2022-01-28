const signInUserError = (error:string):false => {
	const errorsSection = document.getElementById('signInErrors');
	if (!errorsSection) {console.error("error element not found"); return false;}
	errorsSection.style.display = "block";
	const errorElem = document.createElement("li");
	errorElem.style.padding = "5rem auto";
	errorElem.innerText = error;
	errorsSection.appendChild(errorElem);
	return false;
}
const clearSignInUserError = ():void => {
	const errorsSection = document.getElementById('signInErrors');
	if (!errorsSection) {console.error("error element not found"); return;}
	errorsSection.innerHTML = "";
	errorsSection.style.display = "none";
}
const signInZacError = (error:string):false => {
	console.error(error);
	signUpUserError("Zac messed something up. Try again or report bug");
	return false;
}

const trySignIn = async () => {
	clearSignInUserError();
	let success = true;
	const usernameInput:HTMLInputElement|null = document.querySelector("#username");
	const passwordInput:HTMLInputElement|null = document.querySelector("#password");
	let [username, password] = ["",""];
	if (usernameInput) username = usernameInput.value;
	else success = signInZacError("username element not found");
	if (passwordInput) password = passwordInput.value;
	else success = signInZacError("password element not found");

	if (!success) return; //First success check
	if (!usernameInput || !passwordInput) return; //Addition typescript satisfying
	 
	if (username==='') success = signInUserError("Must include username");
	if (password==='') success = signInUserError("Must include password");

	if (!success) return; //Final pre-request success verification
	usernameInput.readOnly = true;
	passwordInput.readOnly = true;

	let json = await httpReq("/auth/signin", false, "POST", {
		username: username,
		password: password,
	});
	if (!json) signInZacError("invalid request");
	else {
		const data = JSON.parse(json);
		if (data.success) {
			setCookie("username", username);
			setCookie("token", data.response.token);
			window.location.href= "../stats";
		} else if (data.success===false) {
			data.errors.forEach((error:string) => {
				signInUserError(error);
			});
		} else signInZacError(json);
	}
	usernameInput.readOnly = false;
	passwordInput.readOnly = false;
}