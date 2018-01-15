const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config');
const Comment = require('../models/comment');

router.post('/', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
  const { text, articleId } = req.body;
  const writerId = req.user.id;

  let comment = new Comment()
  comment.save({
    text, articleId, writerId, timestamp: new Date()
  })
    .then(() => {
    	res.json({ message: "succesfully inserted comment" });
    }).catch(err => next(err));
});

//TODO need to filter by article
router.get('/', (req, res, next) => {
  let model = new Comment()

  model.find()
    .then(comments => {
      //console.log(comments)
      res.json(comments);
    }).catch(err => next(err));
})

router.delete('/:id', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
  let model = new Comment()
  
  model.findByIdAndRemove(req.params.id)
	.then(data => {
		if (data && !data.deleted) {
			return res.status(404).json({
				message: `The comment with id '${req.params.id}' doesn't exist`,
			});
		}
		res.json({ message: "The comment is deleted" });
	}).catch(err => next(err))
})

module.exports = router;