const axios = require('axios');

const apiClient = (url, headers) => {
    return axios.create({
        baseURL: url,
        headers: headers || {},
    });
};

module.exports = (apiClient);
