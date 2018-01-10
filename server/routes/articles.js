const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config');
const Article = require('../models/article');

router.post('/', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
    const { title, content } = req.body;
    const authorId = req.user._id;

    const article = new Article({
        title, content, authorId
    });

    article.save()
    .then(article => {
        res.json(article);
    })
    .catch(err => next(err));
});

module.exports = router;