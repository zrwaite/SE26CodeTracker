const confirmEmail = async () => {
	const confirmationCodeInput:HTMLInputElement|null = document.querySelector("#confirmationCode");
	const emailInput:HTMLInputElement|null = document.querySelector("#email");
	let confirmationCode = "";
	let email = "";
	if (confirmationCodeInput) confirmationCode = confirmationCodeInput.value;
	else return;
	if (emailInput) email = emailInput.value;
	else return;
	if (confirmationCode==='' || email==='') return;
	confirmationCodeInput.readOnly = true;
	emailInput.readOnly = true;
	let json = await httpReq("/auth/confirmEmail", false, "POST", {
		email: email,
		confirmation_code: confirmationCode,
	});
	if (!json) alert("invalid request");
	else {
		const data = JSON.parse(json);
		if (data.success) {
			alert("success!");
			window.location.href= "../stats";
		} else if (data.success===false) {
			data.errors.forEach((error:string) => {
				alert(error);
			});
		} else console.error(json);
	}
	confirmationCodeInput.readOnly = false;
	emailInput.readOnly = false;
}