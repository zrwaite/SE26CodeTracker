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
        console.log(JSON.stringify(error));
        console.error(error);
        return Promise.reject(JSON.stringify(error));
    }
}  