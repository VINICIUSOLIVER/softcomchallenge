import api from "./api";
import axios from "axios";

export async function registerDevice() {
    return await axios.get(`${localStorage.getItem("@softcomchallenge/url")}&device_id=softcomchallenge`);
}

export async function createToken() {
    return await api.post("softauth/authentication/token", {
        grant_type: "client_credentials",
        client_id: localStorage.getItem("@softcomchallenge/client_id"),
        client_secret: localStorage.getItem("@softcomchallenge/client_secret")
    });
}

export async function testToken() {
    return await api.get("softauth/api/testtoken", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("@softcomchallenge/token")}`
        }
    });
}

export async function refreshToken(callback: Function, fallback: Function) {
    return await api.get("softauth/authentication/testtoken", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("@softcomchallenge/token")}`
        }
    }).then(response => {
        return callback(response);
    }).catch(error => {
        return fallback(error);
    });
}