const router = require('express').Router();
const sequelize = require('../config/connection');

const { Post, User, Comment } = require('../models');
const wAuth = require('../utils')

router.get('/', wAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ]
    })
})