const articleRoute = require('express').Router();

const { getArticle, createArticle, deleteArticle } = require('../controllers/articles');

const validation = require('../helpers/validation');

articleRoute.get('/articles', getArticle)
  .post('/articles', validation.articleData, createArticle)
  .delete('/articles/:articleId', validation.articleId, deleteArticle);

module.exports = articleRoute;
