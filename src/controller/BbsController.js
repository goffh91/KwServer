const moment = require('moment');
const BaseController = require('./BaseController');
const BbsService = require('../service/BbsService');
const { DATETIME_FORMAT } = require('../config/constant');

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
 */
class BbsController extends BaseController {
    constructor() {
        super();
    }

    /**
     * @swagger
     *  /bbs/{bo_table}:
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
     *       - name: page
     *         in: query
     *         description: "리스트 페이지"
     *         required: false
     *         type: string
     */
    static async getBbsList(req, res, next) {
        try {
            const { bo_table } = req.params;
            // const { sfl, stx } = req.body;
            const page = req.query.page || 1;

            const auth = await BbsService.checkAuth('list', bo_table, req.user);
            if (auth.result === false) return res.status(auth.status).json(auth);

            const result = await BbsService.getBbsList(bo_table, page);
            res.json({ result });
        } catch (error) {
            next(error);
        }
    }

    /**
     * @swagger
     *  /bbs/{bo_table}/{wr_id}:
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
     */
    static async getBbsView(req, res, next) {
        try {
            const { bo_table, wr_id } = req.params;

            const auth = await BbsService.checkAuth('read', bo_table, req.user);
            if (auth.result === false) return res.status(auth.status).json(auth);

            const result = await BbsService.getBbs(bo_table, wr_id);
            console.log(result);
            res.json({ result });
        } catch (error) {
            next(error);
        }
    }

    /**
     * @swagger
     *  /bbs/{bo_table}:
     *    post:
     *      tags:
     *      - bbs
     *      description: 게시글을 작성한다.
     *      produces:
     *      - applicaion/json
     *      parameters:
     *       - name: bo_table
     *         in: path
     *         description: "게시판 테이블명"
     *         required: true
     *         type: string
     */
    static async createBbs(req, res, next) {
        try {
            const { bo_table } = req.params;

            const auth = await BbsService.checkAuth('write', bo_table, req.user);
            if (auth.result === false) res.status(auth.status).json(auth);

            const {
                wr_name: user_name,
                wr_password,
                wr_email,
                wr_homepage,
                wr_subject,
                wr_content,
                wr_link1,
                wr_link2,
                bf_file,
                captcha_key,
            } = req.body;
            const wr_name = req.user.mb_nick ? req.user.mb_nick : user_name;
            const now = moment().format(DATETIME_FORMAT);
            const params = {
                wr_name,
                wr_password,
                wr_email,
                wr_homepage,
                wr_subject,
                wr_content,
                wr_link1,
                wr_link2,
                wr_ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
                wr_datetime: now,
                wr_last: now,
            };

            const result = await BbsService.createBbs(bo_table, params);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    static async editBbs(req, res, next) {
        try {
            const { bo_table, wr_id } = req.params;

            const auth = await BbsService.checkUDAuth(bo_table, wr_id, req.user);
            if (auth.result === false) res.status(auth.status).json(auth);

            const {
                wr_name: user_name,
                wr_password,
                wr_email,
                wr_homepage,
                wr_subject,
                wr_content,
                wr_link1,
                wr_link2,
                bf_file,
                captcha_key,
            } = req.body;
            const wr_name = req.user.mb_nick ? req.user.mb_nick : user_name;
            const now = moment().format(DATETIME_FORMAT);
            const params = {
                wr_name,
                wr_email,
                wr_homepage,
                wr_subject,
                wr_content,
                wr_link1,
                wr_link2,
                wr_last: now,
            };

            const result = await BbsService.editBbs(bo_table, wr_id, params);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }

    static async deleteBbs(req, res, next) {
        try {
            const { bo_table, wr_id } = req.params;

            const auth = await BbsService.checkUDAuth(bo_table, wr_id, req.user);
            if (auth.result === false) return res.status(auth.status).json(auth);

            const result = await BbsService.deleteBbs(bo_table, wr_id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = BbsController;
