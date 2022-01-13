const redirect = (loggedInPage:boolean) => {
	if (loggedInPage === (!getCookie("username") || !getCookie("token"))) {
		if (loggedInPage) window.location.href= "/frontend/signin";
		else window.location.href= "/frontend/stats";
	}	
}
