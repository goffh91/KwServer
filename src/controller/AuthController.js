const BaseController = require('./BaseController');
const UserService = require('../service/UserService');

class AuthController extends BaseController {
    constructor() {
        super();
    }

    static async login(req, res, next) {
        try {
            const { } = req.params;
            const user = await UserService.getUserById();
        } catch (error) {
            next(error);
        }
    }

}

module.exports = AuthController;
