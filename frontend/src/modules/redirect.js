"use strict";
const redirect = (loggedInPage) => {
    if (loggedInPage === (!getCookie("username") || !getCookie("token"))) {
        if (loggedInPage)
            window.location.href = "../signin";
        else
            window.location.href = "../stats";
    }
};
