const BaseController = require('./baseController');
const BbsService = require('../service/bbsService');

/**
 * @swagger
 * definitions:
 *  bbs:
 *   type: object
 *   required:
 *     - bo_table
 *     - wr_id
 *     - wr_subject
 *     - wr_content
 *     - mb_id
 *     - wr_name
 *     - wr_datetime
 *   properties:
 *     bo_table:
 *       type: string
 *       description: 게시판 명
 *     wr_id:
 *       type: string
 *       description: 게시글 번호
 *     wr_subject:
 *       type: string
 *       description: 게시글 제목
 *     wr_content:
 *       type: string
 *       description: 게시글 내용
 *     mb_id:
 *       type: string
 *       description: 글쓴이 아이디
 *     wr_name:
 *       type: string
 *       description: 글쓴이 닉네임
 *     wr_datetime:
 *       type: date
 *       description: 게시글 날짜
 */
class BbsController extends BaseController {
    constructor() {
        super();
    }

    /**
    * @swagger
    *  /bbs/{bo_table}/list:
    *    get:
    *      tags:
    *      - bbs
    *      description: 모든 게시글을 가져온다.
    *      produces:
    *      - applicaion/json
    *      parameters:
    *       - name: bo_table
    *         in: path
    *         description: "게시판 테이블명"
    *         required: true
    *         type: string
    *      responses:
    *       200:
    *        description: get whole boardList.
    *        schema:
    *          type: array
    */
    static async getBbsList(req, res, next) {
        const { bo_table } = req.params;
        const page = req.params.page || 1;
        try {
            const result = await BbsService.getBbsList(bo_table, page);
            res.json({ result });
        }
        catch (error) {
            next(error);
        }
    }

    /**
    * @swagger
    *  /bbs/{bo_table}/view/{wr_id}:
    *    get:
    *      tags:
    *      - bbs
    *      description: 지정된 게시글을 가져온다.
    *      produces:
    *      - applicaion/json
    *      parameters:
    *       - name: bo_table
    *         in: path
    *         description: "게시판 테이블명"
    *         required: true
    *         type: string
    *       - name: wr_id
    *         in: path
    *         description: "게시글 번호"
    *         required: true
    *         type: number
    *      responses:
    *       200:
    *        description: board of selected id column list
    *        schema:
    *          type: array
    */
    static async getBbs(req, res, next) {
        const { bo_table, wr_id } = req.params;
        try {
            const result = await BbsService.getBbs(bo_table, wr_id);
            res.json({ result });
        }
        catch (error) {
            next(error);
        }
    }

}

module.exports = BbsController;
