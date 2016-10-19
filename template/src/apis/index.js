'use strict';

const express = require('express');
const router = express.Router();

const postController = require('./v1/post');

router
  .get('/v1/posts', postController.fetch)


module.exports = router;
