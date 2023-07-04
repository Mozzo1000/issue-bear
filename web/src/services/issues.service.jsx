import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/v1/issues";

const archive = (id) => {
    return axios.delete(API_URL + "/" + id, { headers: authHeader() })
};


export default {
    archive,
};