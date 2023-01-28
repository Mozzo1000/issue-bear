import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/v1/projects";

const getAll = () => {
    return axios.get(API_URL, { headers: authHeader() })
};

const getIssues = (id) => {
    return axios.get(API_URL + "/" + id + "/issues", { headers: authHeader() })
};

const add = (name, url) => {
    return axios.post(API_URL, { name, url }, { headers: authHeader() })
};

export default {
    getAll,
    getIssues,
    add,
};