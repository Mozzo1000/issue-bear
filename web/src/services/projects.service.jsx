import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/v1/projects";

const get = (id) => {
    return axios.get(API_URL + "/" + id, { headers: authHeader() })
};

const getAll = () => {
    return axios.get(API_URL, { headers: authHeader() })
};

const getIssues = (id) => {
    return axios.get(API_URL + "/" + id + "/issues", { headers: authHeader() })
};

const add = (name, url) => {
    return axios.post(API_URL, { name, url }, { headers: authHeader() })
};

const generateToken = (id) => {
    return axios.put(API_URL + "/" + id + "/token", {}, { headers: authHeader() })
};

const addMember = (id, email) => {
    return axios.post(API_URL + "/" + id + "/members", { email }, { headers: authHeader() })
};

export default {
    get,
    getAll,
    getIssues,
    add,
    generateToken,
    addMember,
};