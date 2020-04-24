const apiClient = require('../utils/apiClient');
const Authentication = require('../utils/Authenticate');

class BaseProvider {

    constructor() {
        this.accessToken;
        this.instance;
        this.accessToken = '';
        this.instance = null;
    }

    setToken(accessToken) {
        this.accessToken = accessToken;
    }

    setInstance(url, headers) {
        this.instance = apiClient(url, headers);
        this.instance.interceptors.response.use(
            (response) => response,
            (err) => Promise.reject(err),
        );
    }

    getInstance() {
        return this.instance;
    }

    async generateToken(userId) {
        return `Bearer ${Authentication.generateToken(userId)}`;
    }

}

module.exports = (BaseProvider);