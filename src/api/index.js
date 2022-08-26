import { Navigate } from "react-router-dom";
import { useMainContext, MainContext } from "../store/contexts";
const axios = require('axios');
const apiConfig = { headers: {
    "Content-Type": "application/json"
}}

async function axiosWrapper(data, config, url, ) {
    try {
        let res = await axios.post(url, data, config);
        return res;

    } catch (e) {
        console.error("erreur: " + e);
        return e;
    }
}

const register = (newUser) => {
    return axiosWrapper(newUser, apiConfig, `${process.env.REACT_APP_API_URL}/auth/signup`);
}

const login = (newUser) => {
    return axiosWrapper(newUser, apiConfig, `${process.env.REACT_APP_API_URL}/auth/signin`);

}

const logout = (newUser) => {
    return axiosWrapper(newUser, apiConfig, `${process.env.REACT_APP_API_URL}/auth/signout`);
}

const syncData = (newUser) => {
    // return axiosWrapper(newUser, apiConfig, `${process.env.REACT_APP_API_URL}/auth/signout`);
}

export {
    register, 
    login,
    syncData,
    logout
}
