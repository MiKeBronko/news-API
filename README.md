# Дипломная работа - API

## ver 0.0.1

## API для аутентификации пользователей и сохранения статей

```bash
#сервер на localhost:3000
npm run start
```

```bash
#сервер на localhost:3000 с хот релоудом
npm run dev
```

## API можно найти здесь ( <https://newsviewer.ml/api>) или ( <https://api.newsviewer.ml>)

## Запросы

* GET /users/me возвращает информацию о пользователе (email и имя);
* GET /articles — все сохранённые пользователем статьи;
* POST /articles создаёт статью с переданными в теле данными;
* DELETE /articles/articleId удаляет сохранённую статью по _id;
* POST /signup создаёт пользователя с переданными в теле данными;
* POST /signin возвращает JWT, если в теле запроса переданы правильные почта и пароль
