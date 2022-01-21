const signUpUserError = (error:string):false => {
	const errorsSection = document.getElementById('signUpErrors');
	if (!errorsSection) {console.error("error element not found"); return false;}
	errorsSection.style.display = "block";
	const errorElem = document.createElement("li");
	errorElem.style.padding = "5rem auto";
	errorElem.innerText = error;
	errorsSection.appendChild(errorElem);
	return false;
}
const clearSignUpUserError = ():void => {
	const errorsSection = document.getElementById('signUpErrors');
	if (!errorsSection) {console.error("error element not found"); return;}
	errorsSection.innerHTML = "";
	errorsSection.style.display = "none";
}
const signUpZacError = (error:string):false => {
	console.error(error);
	signUpUserError("Zac messed something up. Try again or report bug");
	return false;
}
const checkPassword = (password:string):string[] => {
	let errors = [];
	const lowerCaseLetters = /[a-z]/g;
	if(!password.match(lowerCaseLetters)) errors.push("Password should include a lowercase letter");
	const upperCaseLetters = /[A-Z]/g;
	if(!password.match(upperCaseLetters)) errors.push("Password should contain an upercase letter");
	const numbers = /[0-9]/g;
	if(!password.match(numbers)) errors.push("Password should contain a number");
	if(password.length < 8) errors.push("Password should be 8 characters long");
	return errors;
}
const checkEmail = (email:string):string|false => {//Taken from stack overflow
	if (!email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	)) return "Invalid Email";
	else if (!email.trim().endsWith("@uwaterloo.ca")) return "Email must be uwaterloo email";
	else return false;
};

const trySignUp = async () => {
	clearSignUpUserError();
	let success = true;
	const usernameInput:HTMLInputElement|null = document.querySelector("#username");
	const emailInput:HTMLInputElement|null = document.querySelector("#email");
	const passwordInput:HTMLInputElement|null = document.querySelector("#password");
	const codeInput:HTMLInputElement|null = document.querySelector("#code");
	let [username, email, code, password] = ["","","",""];
	if (usernameInput) username = usernameInput.value;
	else success = signUpZacError("username element not found");
	if (emailInput) email = emailInput.value;
	else success = signUpZacError("email element not found");
	if (codeInput) code = codeInput.value;
	else success = signUpZacError("code element not found");
	if (passwordInput) password = passwordInput.value;
	else success = signUpZacError("password element not found");

	if (!success) return; //First success check
	if (!usernameInput || !emailInput || !codeInput || !passwordInput) return; //Addition typescript satisfying
	 
	if (username==='') success = signUpUserError("Must include username");
	if (code==='') success = signUpUserError("Must include code");
	else if (code.length!==84) success = signUpUserError("The code seems invalid - try removing whitespace or getting a new code.");
	if (password==='') success = signUpUserError("Must include password");
	else {
		const passwordErrors = checkPassword(password);
		passwordErrors.forEach((error) => success = signUpUserError(error));
	}
	if (email==='') success = signUpUserError("Must include email");
	else {
		const emailError = checkEmail(email);
		if (emailError) success = signUpUserError(emailError);
	}

	if (!success) return; //Final pre-request success verification
	usernameInput.readOnly = true;
	emailInput.readOnly = true;
	codeInput.readOnly = true;
	passwordInput.readOnly = true;
	let json = await httpReq("/api/user", "POST", {
		username: username,
		password: password,
		email: email,
		code: code
	});
	if (json) {
		const data = JSON.parse(json);
		if (data.success) {
			setCookie("username", data.response.userData.username);
			setCookie("token", data.response.token);
			window.location.href= "../stats";
		} else {
			data.errors.forEach((error:string) => {
				signUpUserError(error);
			});
		};
	} else signUpUserError("SIGN IN ERROR");
	usernameInput.readOnly = false;
	emailInput.readOnly = false;
	codeInput.readOnly = false;
	passwordInput.readOnly = false;
}

const expand = (index:number) => {
	let sectionId = `stepSection${index}`;
	let iconId = `stepIcon${index}`;
	let section = document.getElementById(sectionId);
	let errorsSection = document.getElementById('signUpErrors');
	let icon:any = document.getElementById(iconId);
	if (!section || !icon || !errorsSection) return;
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