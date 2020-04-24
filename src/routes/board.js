const express = require('express');
const asyncHandler = require('express-async-handler');
const BaseController = require('../controller/BaseController');
const BoardController = require('../controller/boardController');

const router = express.Router();

router.get('/list', asyncHandler(BoardController.getBoardList));
router.get('/list/:page', asyncHandler(BoardController.getBoardList));


module.exports = exports = router;
