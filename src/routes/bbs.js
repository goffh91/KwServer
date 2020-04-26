const express = require('express');
const asyncHandler = require('express-async-handler');
const BbsController = require('../controller/bbsController');

const router = express.Router();

router.get('/:bo_table', asyncHandler(BbsController.getBbsList));
router.post('/:bo_table', asyncHandler(BbsController.createBbs));

router.get('/:bo_table/:wr_id', asyncHandler(BbsController.getBbsView));
router.put('/:bo_table/:wr_id', asyncHandler(BbsController.editBbs));
router.delete('/:bo_table/:wr_id', asyncHandler(BbsController.deleteBbs));


module.exports = (router);
