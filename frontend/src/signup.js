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
const trySignUp = () => __awaiter(void 0, void 0, void 0, function* () {
    const usernameInput = document.querySelector("#username");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const codeInput = document.querySelector("#code");
    let username, email, code, password;
    if (usernameInput) {
        username = usernameInput.value;
        if (!usernameInput.checkValidity())
            return;
    }
    else {
        console.error("username element not found");
        return;
    }
    if (emailInput) {
        email = emailInput.value;
        if (!emailInput.checkValidity())
            return;
    }
    else {
        console.error("email element not found");
        return;
    }
    if (codeInput) {
        code = codeInput.value;
        if (!codeInput.checkValidity())
            return;
    }
    else {
        console.error("code element not found");
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
    if (username === '' || code === '' || password == '' || email == '')
        return;
    usernameInput.readOnly = true;
    emailInput.readOnly = true;
    codeInput.readOnly = true;
    passwordInput.readOnly = true;
    let json = yield httpReq("/api/user", "POST", {
        username: username,
        password: password,
        email: email,
        code: code
    });
    let res = document.getElementById("response");
    if (!res)
        return;
    if (json) {
        const data = JSON.parse(json);
        if (data.success) {
            setCookie("username", data.response.userData.username);
            setCookie("token", data.response.token);
            window.location.href = "../stats";
        }
        else
            alert(data.errors);
    }
    else
        res.innerHTML = "SIGN IN ERROR";
    usernameInput.readOnly = false;
    emailInput.readOnly = false;
    codeInput.readOnly = false;
    passwordInput.readOnly = false;
});
const expand = (index) => {
    let sectionId = `stepSection${index}`;
    let iconId = `stepIcon${index}`;
    let section = document.getElementById(sectionId);
    let icon = document.getElementById(iconId);
    if (!section || !icon)
        return;
    if (icon.flipped) {
        icon.style.transform = "rotate(0deg)";
        icon.flipped = false;
        section.style.display = "none";
    }
    else {
        icon.flipped = true;
        icon.style.transform = "rotate(180deg)";
        section.style.display = "block";
    }
};
