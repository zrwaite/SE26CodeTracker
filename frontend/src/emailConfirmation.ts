const getParameterByName = (name:string, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const renderPageData = () => {
	let email = getParameterByName("email");
	const emailSpan = document.getElementById('userEmail');
	if (!emailSpan || !email) return;
	emailSpan.innerText = email;
}

const confirmEmail = async () => {
	const confirmationCodeInput:HTMLInputElement|null = document.querySelector("#confirmationCode");
	let confirmationCode = "";
	if (confirmationCodeInput) confirmationCode = confirmationCodeInput.value;
	else return;
	if (confirmationCode==='') return;
	confirmationCodeInput.readOnly = true;

	let json = await httpReq("/auth/confirmEmail", false, "POST", {
		email: getParameterByName("email"),
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
}