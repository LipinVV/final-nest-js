API Модуля «Аутентификация и авторизация»

POST-запросы
http://localhost:3000/auth/client/register - регистрируемся,
http://localhost:3000/auth/login - вводим email + password, в БД попадает сущность нового пользователя, у неё берём id, например 6704fc4cc7ea3360133d343f,
http://localhost:3000/auth/profile/6704fc4cc7ea3360133d343f - получаем юзера,
http://localhost:3000/auth/logout - выходим
