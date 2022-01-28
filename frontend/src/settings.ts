const deleteAccount = async () => {
	const username = getCookie("username");
	const confirmation = confirm("Are you sure you want to delete your account?");
	if (!confirmation) return;
	if (!username) {
		alert("Can't delete account, not signed in");
		window.location.href= "../signin";
		return;
	}
	let json = await httpReq("/api/user", true, "DELETE", {
		username: username,
	});
	if (!json || json===undefined) alert("invalid request");
	else {
		const data = JSON.parse(json);
		if (data.success) {
			logout();
		} else if (data.success===false) {
			data.errors.forEach((error:string) => {
				console.error(error);
			});
		} else console.error(json);
	}
}

const logout = () => {
    deleteCookie("name");
    deleteCookie("token");
    window.location.href= "../home";
}