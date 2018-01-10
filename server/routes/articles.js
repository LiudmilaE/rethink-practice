const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config');
const Article = require('../models/article');

router.get('/', (req, res, next) => {
  Article.find()
    .then(articles => {
			res.json(articles);
		})
		.catch(err => next(err));
})

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

// router.get('/:id', (req, res, next) => {
//     Article.findById(req.params.id)
//     .then(article => {
//         res.json(article);
//     }).catch(err => next(err));
// });

router.patch('/:id', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
  Article.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(article => {
      res.json(article);
    }).catch(err => next(err));
});

router.delete('/:id', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
  Article.findByIdAndRemove(req.params.id)
    .then(article => {
			if (!article) {
				return res.status(404).json({
					message: `The article with id '${req.params.id}' doesn't exist`,
				});
			}
      res.json(article);
    }).catch(err => next(err))
});

module.exports = router;