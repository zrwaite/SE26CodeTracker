const baseURL = "http://localhost:2000";
const httpReq = async (url:string, method:string = "GET", params:object = {}) => {
    url = baseURL + url;
    if (method !== "GET" && method !== "POST" && method !== "PUT" && method !== "DELETE") {
        console.log("invalid method");
        return false;
    }
    try {
        let response;
        if (method === "GET") {
            response = await fetch(url, {cache: 'no-cache'});
        } else {
            response = await fetch(url, {
                method: method, // *GET, POST, PUT, DELETE, etc.
                cache: 'no-cache',
                // mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params) // body data type must match "Content-Type" header
            });
        }
        if (!response.ok) {
            const data = await response.json();
            return Promise.resolve(JSON.stringify(data));
        } else {
            const data = await response.json();
            return Promise.resolve(JSON.stringify(data));
        }
    } catch (error) {
        console.log(error);
        console.log(JSON.stringify(error));
        console.error(error);
        return Promise.reject(error);
    }
}

const checkEmail = (email:string, waterloo: boolean):string|false => {//Taken from stack overflow
	if (!email.match(
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	)) return "Invalid Email";
	else if (waterloo && !email.trim().endsWith("@uwaterloo.ca")) return "Email must be uwaterloo email";
	else return false;
};