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
const baseURL = "http://insomnizac.xyz:8002";
const httpReq = (url, method = "GET", params = {}) => __awaiter(void 0, void 0, void 0, function* () {
    url = baseURL + url;
    if (method !== "GET" && method !== "POST" && method !== "PUT" && method !== "DELETE") {
        console.log("invalid method");
        return false;
    }
    try {
        let response;
        if (method === "GET") {
            response = yield fetch(url, { cache: 'no-cache' });
        }
        else {
            response = yield fetch(url, {
                method: method,
                cache: 'no-cache',
                // mode: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params) // body data type must match "Content-Type" header
            });
        }
        const data = yield response.json();
        if (!response.ok) {
            return Promise.resolve(JSON.stringify(data));
        }
        return Promise.resolve(JSON.stringify(data));
    }
    catch (error) {
        console.error(error);
        return Promise.reject(JSON.stringify(error));
    }
});
