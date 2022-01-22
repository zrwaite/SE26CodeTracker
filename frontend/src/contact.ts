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
	signUpUserError("Zac messed something up. Try again or report bug");
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