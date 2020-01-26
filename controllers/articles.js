const Article = require('../models/article');

const Error404 = require('../errors/err-404');
const Error403 = require('../errors/err-403');
const Error400 = require('../errors/err-400');

const errMessage = require('../variables/messages');

module.exports.getArticle = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .populate('owner')
    .then((articles) => {
      if (!articles) {
        throw new Error404(errMessage[404].atricle);
      }
      return res.send({ data: articles });
    })
    .catch(next);
};


module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword, title, text, date, source, link, image, owner: req.user._id,
  })
    .then((articles) => {
      if (!articles) {
        throw new Error400(errMessage[400]);
      }
      return res.send({ data: articles });
    })
    .catch(next);
};


module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .populate('owner')
    .then((article) => {
      if (!article) {
        throw new Error404(errMessage[404].article);
      }
      if (JSON.stringify(req.user._id) === JSON.stringify(article.owner._id)) {
        return Article.findByIdAndRemove(req.params.articleId)
          .then((items) => res.send({ data: items }));
      }
      throw new Error403(errMessage[403]);
    })
    .catch(next);
};
