const BaseController = require('./BaseController');
const BoardService = require('../service/BoardService');

/**
 * @swagger
 * definitions:
 *  board:
 *   type: object
 *   required:
 *     - bo_table
 *     - bo_subject
 *     - bo_skin
 *   properties:
 *     bo_table:
 *       type: string
 *       description: 게시판 테이블명
 *     	bo_subject:
 *       type: string
 *       description: 게시판 명
 *     bo_skin:
 *       type: string
 *       description: 게시판 스킨
 */
class BoardController extends BaseController {
    constructor() {
        super();
    }

    /**
     * @swagger
     *  /board?page={page}:
     *    get:
     *      tags:
     *      - board
     *      description: 모든 게시판을 가져온다.
     *      produces:
     *      - applicaion/json
     *      parameters:
     *       - name: page
     *         in: path
     *         description: "리스트 페이지"
     *         required: false
     *         type: number
     */
    static async getBoardList(req, res, next) {
        try {
            const page = req.query.page || 1;
            const boardList = await BoardService.getBoardList(page);
            res.json(boardList);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @swagger
     *  /board/{bo_table}:
     *    get:
     *      tags:
     *      - board
     *      description: 지정된 게시판을 가져온다.
     *      produces:
     *      - applicaion/json
     *      parameters:
     *       - name: bo_table
     *         in: path
     *         description: "게시판 테이블명"
     *         required: true
     *         type: string
     */
    static async getBoard(req, res, next) {
        try {
            const { bo_table } = req.params;
            const board = await BoardService.getBoard(bo_table);
            res.json(board);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = BoardController;
