const express = require('express');
const asyncHandler = require('express-async-handler');
const BoardController = require('../controller/boardController');

const router = express.Router();

router.get('/', asyncHandler(BoardController.getBoardList));
router.get('/:bo_table', asyncHandler(BoardController.getBoard));


module.exports = (router);
