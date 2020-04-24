const BaseController = require('./baseController');
const BoardService = require('../service/boardService');

/**
 * @swagger
 * definitions:
 *  board:
 *   type: object
 *   required:
 *     - bo_table
 *   properties:
 *     bo_table:
 *       type: string
 *       description: 게시판 명
 */
class BoardController extends BaseController {

    constructor() {
        super();
    }

    /**
     * @swagger
     * definitions:
     *  board:
     *   type: object
     *   required:
     *     - page
     *   properties:
     *     page:
     *       type: number
     *       description: 페이지
     */
    static async getBoardList(req, res, next) {
        const page = req.params.page || 1;
        try {
            const boardList = await BoardService.getBoardList(page);
            res.json(boardList);
        }
        catch (error) {
            next(error);
        }
    }

}

module.exports = BoardController;
