const BaseModel = require('./BaseModel');
const { G5_PREFIX } = require('../config/constant');

class UserModel extends BaseModel {

    constructor() {
        super();
        this.boardTable = G5_PREFIX + 'board';
    }

    async getUserById(mb_id) {
        return this.db.g5_member.findOne({
            where: { mb_id }
        })
    }

}

module.exports = UserModel;
