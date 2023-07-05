import axios from "axios";

const API_URL = "/v1/auth/";

const register = (email, name, password) => {
    return axios.post(API_URL + "register", {
        email,
        name,
        password,
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.access_token) {
                localStorage.setItem("ib_user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("ib_user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("ib_user"));
};

const verify = (email, code) => {
    return axios.post(API_URL + "verify", {
        email,
        code,
    });
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
    verify,
};