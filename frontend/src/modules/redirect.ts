const redirect = (loggedInPage:boolean) => {
	if (loggedInPage === (!getCookie("username") || !getCookie("token"))) {
		if (loggedInPage) window.location.href= "../signin";
		else window.location.href= "../stats";
	}	
}
