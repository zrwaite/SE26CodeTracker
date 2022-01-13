const createCookie = (name:string, value:string) => {
    document.cookie = name + "=" + value + "; path=/";
}
const deleteCookie = (name:string) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
const getCookie = (cname:string) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}