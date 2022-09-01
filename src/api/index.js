import { Navigate } from "react-router-dom";
import { useMainContext, MainContext } from "../store/contexts";
const axios = require('axios');
const apiConfig = { headers: {
    "Content-Type": "application/json"
}}

async function axiosWrapper(method, data, config, url ) {
    try {
        switch (method) {
            case "get":
                return await axios.get(url,{
                    params: data
                }, 
                config
            );
            
            case "post":
                return await axios.post(url, data, config);
        }

    } catch (e) {
        console.error("erreur: " + e);
        return e;
    }
}

const register = (newUser) => {
    return axiosWrapper("post", newUser, apiConfig, `${process.env.REACT_APP_API_URL}/auth/signup`);
}

const login = (newUser) => {
    return axiosWrapper("post", newUser, apiConfig, `${process.env.REACT_APP_API_URL}/auth/signin`);

}

const syncData = (userId, token) => {
    return axiosWrapper("get", {userId, token}, apiConfig, `${process.env.REACT_APP_API_URL}/users/datas`);
}


export {
    register, 
    login,
    syncData,
}
