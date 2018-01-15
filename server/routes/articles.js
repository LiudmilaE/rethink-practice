const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config');
const Article = require('../models/article');

router.get('/', (req, res, next) => {
  const model = new Article()

  model.find()
    .then(articles => {
      //console.log (articles)
			res.json(articles);
		})
		.catch(err => next(err));
})


router.post('/', passport.authenticate('jwt', config.jwtSession),  (req, res, next) => {
  const { title, content } = req.body;
  const authorId = req.user.id;

  let article = new Article()
  article.save({
    title, content, authorId , timestamp: new Date()
  })
  	.then(() => {
    	res.json({ message: "succesfully inserted article" });
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
  let model = new Article()
  model.findByIdAndUpdate(req.params.id, req.body)
    .then(article => {
      res.json(article);
    }).catch(err => next(err));
});

router.delete('/:id', passport.authenticate('jwt', config.jwtSession), (req, res, next) => {
	let model = new Article()
  model.findByIdAndRemove(req.params.id)
    .then(data => {
			if (data && !data.deleted) {
				return res.status(404).json({
					message: `The article with id '${req.params.id}' doesn't exist`,
				});
			}
      res.json({ message: `The article with id '${req.params.id}' is deleted` });
    }).catch(err => next(err))
});

module.exports = router;