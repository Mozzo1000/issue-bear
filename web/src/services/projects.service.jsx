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

const getMembers = (id) => {
    return axios.get(API_URL + "/" + id + "/members", { headers: authHeader() })
};

const edit = (id, data) => {
    return axios.patch(API_URL + "/" + id, data, { headers: authHeader() });
};

const remove = (id) => {
    return axios.delete(API_URL + "/" + id, { headers: authHeader() });
};

const removeMember = (project_id, member_id) => {
    return axios.delete(API_URL + "/" + project_id + "/members/" + member_id, { headers: authHeader() });
};

export default {
    get,
    getAll,
    getIssues,
    add,
    generateToken,
    addMember,
    getMembers,
    edit,
    remove,
    removeMember,
};