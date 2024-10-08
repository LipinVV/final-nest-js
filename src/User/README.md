Создание пользователя:

curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{
"email": "test@admin.com",
"password": "password",
"name": "First User",
"contactPhone": "+79085553344",
"role": "admin"
}'

Получение пользователя по ID:
curl -X GET http://localhost:3000/users/67057ac6507ceae44255f080

Получение пользователя по email:
curl -X GET http://localhost:3000/users/email/test@example.com

Поиск всех пользователей с фильтрацией:
curl -X GET 'http://localhost:3000/users?limit=10&offset=0&email=test'
