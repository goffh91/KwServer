const BaseModel = require('./BaseModel');

class BbsFileModel extends BaseModel {

    constructor() {
        super();
    }

    async getBbsFiles(params) {
        const { bo_table, wr_id } = params;
        return this.db.g5_board_file.findMany({
            where: { bo_table, wr_id }
        });
    }

}

module.exports = BbsFileModel;