const express = require('express');
const asyncHandler = require('express-async-handler');
const BoardController = require('../controller/boardController');

const router = express.Router();

router.get('/', asyncHandler(BoardController.getBoardList));
router.get('/:page', asyncHandler(BoardController.getBoardList));


module.exports = (router);
