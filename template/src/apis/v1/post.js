'use strict';

const postProxy = require('../../proxy').Post;

/**
 * @api {get} /v1/post 请求文章列表
 * @apiName get
 * @apiGroup Post
 *
 * @apiParam {Number} page 第几页.
 * @apiParam {Number} limit 每页数据条数.
 *
 * @apiSuccess {Array} list Array of post.
 */

exports.fetch = (req, res) => {
  let limit = req.query.limit || 10;
  let offset = req.query.offset || 0;

  postProxy.fetchPosts(limit, offset)
  .then(result => {
    res.send(200, result);
  })
};
