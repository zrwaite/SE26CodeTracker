const contactUserError = (error:string):false => {
	const errorsSection = document.getElementById('contactErrors');
	if (!errorsSection) {console.error("error element not found"); return false;}
	errorsSection.style.display = "block";
	const errorElem = document.createElement("li");
	errorElem.innerText = error;
	errorsSection.appendChild(errorElem);
	return false;
}
const clearContactUserError = ():void => {
	const errorsSection = document.getElementById('contactErrors');
	if (!errorsSection) {console.error("error element not found"); return;}
	errorsSection.innerHTML = "";
	errorsSection.style.display = "none";
}
const contactZacError = (error:string):false => {
	console.error(error);
	contactUserError("Zac messed something up. Try again or report bug");
	return false;
}

const displayIcon = () => {
	let success = true;
	let contactType = "";
	const contactTypeInput:HTMLInputElement|null = document.querySelector("#contactType");
	if (contactTypeInput) contactType = contactTypeInput.value;
	else success = contactZacError("contactType element not found");
	if (!success) return;
	const contactTypeIcon:HTMLInputElement|null = document.querySelector("#contactTypeIcon");
	if (!contactTypeIcon) return;
	if (contactType==="bug") contactTypeIcon.src="../images/bug.svg";
	else if (contactType==="zac") contactTypeIcon.src="../images/account.svg";
	else alert('aaahhh');
}



const tryContact = async () => {
	clearContactUserError();
	let success = true;
	const contactTypeInput:HTMLInputElement|null = document.querySelector("#contactType");
	const emailInput:HTMLInputElement|null = document.querySelector("#email");
	const messageInput:HTMLInputElement|null = document.querySelector("#message");
	let [contactType, email, message] = ["","", ""];
	if (contactTypeInput) contactType = contactTypeInput.value;
	else success = contactZacError("contactType element not found");
	if (emailInput) email = emailInput.value;
	else success = contactZacError("email element not found");
	if (messageInput) message = messageInput.value;
	else success = contactZacError("message element not found");

	if (!success) return; //First success check
	if (!messageInput || !emailInput || !contactTypeInput) return; //Addition typescript satisfying
	 
	if (contactType==='') success = contactUserError("Must include contactType");
	if (message==='') success = contactUserError("Must include message");
	if (email==='') success = contactUserError("Must include email");
	else {
		const emailError = checkEmail(email, false);
		if (emailError) success = contactUserError(emailError);
	}

	if (!success) return; //Final pre-request success verification
	contactTypeInput.readOnly = true;
	emailInput.readOnly = true;
	messageInput.readOnly = true;
	let json = await httpReq("/function/contact ", "POST", {
		email: email,
		message: message,
		contact_type: contactType
	});
	if (json) {
		const data = JSON.parse(json);
		if (data.success) {
			console.log(data);
		} else {
			data.errors.forEach((error:string) => {
				contactUserError(error);
			});
		};
	} else contactUserError("CONTACT ERROR");
	contactTypeInput.readOnly = false;
	emailInput.readOnly = false;
	messageInput.readOnly = false;
}