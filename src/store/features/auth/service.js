import api from "../../../utils/constants/Api.js";
import config from "../../../utils/constants/endpoint.js";

const authService = {
    login: async (credentials) => {
        const response = await api.post(config.auth.login, credentials);
        return response.data;
    },
};

export default authService;