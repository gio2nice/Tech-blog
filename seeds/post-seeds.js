const { Post } = require('../models');

const postData = [];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPosts;