const articleRoute = require('express').Router();

const auth = require('../middlewares/auth');

const { getArticle, createArticle, deleteArticle } = require('../controllers/articles');

const validation = require('../helpers/validation');

articleRoute.get('/articles', auth, getArticle)
  .post('/articles', validation.articleData, auth, createArticle)
  .delete('/articles/:articleId', validation.articleId, auth, deleteArticle);

module.exports = articleRoute;
