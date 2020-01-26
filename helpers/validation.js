const { celebrate, Joi } = require('celebrate');

const linkValid = require('../variables/regexp-link');

const signup = celebrate({
  body: Joi.object().keys(
    {
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    },
  ),
});

const signin = celebrate({
  body: Joi.object().keys(
    {
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    },
  ),
});

const articleData = celebrate({
  body: Joi.object().keys(
    {
      keyword: Joi.string().required().min(2).max(30),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required().min(2).max(30),
      link: Joi.string().required().regex(linkValid),
      image: Joi.string().required().regex(linkValid),
    },
  ),
});

const articleId = celebrate({
  params: Joi.object().keys(
    {
      articleId: Joi.string().alphanum().length(24).regex(/^[0-9a-fA-F]{24}$/),
    },
  ),
});


module.exports = {
  signup, signin, articleData, articleId,
};
