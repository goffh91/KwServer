module.exports = {
    user_m: new (require('./UserModel'))(),
    board_m: new (require('./BoardModel'))(),
    bbs_m: new (require('./BbsModel'))(),
    bbs_file_m: new (require('./BbsFileModel'))(),
}
