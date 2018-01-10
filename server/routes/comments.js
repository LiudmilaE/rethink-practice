const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config');
const Comment = require('../models/comment');

router.post('/', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
  const { text, articleId } = req.body;
  const writerId = req.user._id;

  const comment = new Comment({
    text, articleId, writerId
  });

  comment.save()
    .then(comment => {
      res.json(comment);
    }).catch(err => next(err));
});

router.get('/', (req, res, next) => {
  Comment.find()
    .then(comments => {
      res.json(comments);
    }).catch(err => next(err));
})

router.delete('/:id', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
	Comment.findByIdAndRemove(req.params.id)
	.then(comment => {
		if (!comment) {
			return res.status(404).json({
				message: `The comment with id '${req.params.id}' doesn't exist`,
			});
		}
		res.json(comment);
	}).catch(err => next(err))
})

module.exports = router;