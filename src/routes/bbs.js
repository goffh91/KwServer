const express = require('express');
const asyncHandler = require('express-async-handler');
const BbsController = require('../controller/bbsController');

const router = express.Router();

router.get('/:bo_table/list', asyncHandler(BbsController.getBbsList));
router.get('/:bo_table/view/:wr_id', asyncHandler(BbsController.getBbs));


module.exports = exports = router;
