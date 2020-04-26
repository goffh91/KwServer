const BaseService = require('./BaseService');
const { user_m } = require('../model');

class UserService extends BaseService {

    constructor() {
        super();
    }

    static async getUserById(userId) {
        return await user_m.getUserById(userId);
    }

}

module.exports = UserService;