"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const trySignIn = () => __awaiter(void 0, void 0, void 0, function* () {
    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");
    let username, password;
    if (usernameInput) {
        username = usernameInput.value;
        if (!usernameInput.checkValidity())
            return;
    }
    else {
        console.error("username element not found");
        return;
    }
    if (passwordInput) {
        password = passwordInput.value;
        if (!passwordInput.checkValidity())
            return;
    }
    else {
        console.error("password element not found");
        return;
    }
    if (username === '' || password == '')
        return;
    usernameInput.readOnly = true;
    passwordInput.readOnly = true;
    let json = yield httpReq("/auth/signin", "POST", {
        username: username,
        password: password,
    });
    let res = document.getElementById("response");
    if (!res)
        return;
    if (json) {
        const data = JSON.parse(json);
        if (data.success) {
            setCookie("username", username);
            setCookie("token", data.response.token);
            window.location.href = "../stats";
        }
        else {
            alert(data.errors);
        }
        res.innerHTML = json;
    }
    else
        res.innerHTML = "SIGN IN ERROR";
    usernameInput.readOnly = false;
    passwordInput.readOnly = false;
});
