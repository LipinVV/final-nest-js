Создание пользователя:

curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{
"email": "test@example.com",
"passwordHash": "hashed_password",
"name": "John Doe",
"contactPhone": "1234567890",
"role": "client"
}'

Получение пользователя по ID:
curl -X GET http://localhost:3000/users/67017a2385687fc921d8be0f

Получение пользователя по email:
curl -X GET http://localhost:3000/users/email/test@example.com

Поиск всех пользователей с фильтрацией:
curl -X GET 'http://localhost:3000/users?limit=10&offset=0&email=test'
