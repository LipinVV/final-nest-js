Управление пользователями

Администратор (admin):

curl -X POST http://localhost:3000/api/admin/users \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <admin_token>" \
-d '{
"email": "newuser@example.com",
"password": "password123",
"name": "New User",
"contactPhone": "123456789",
"role": "user"
}'

response:
{
"id": "60af924ff2e4e8b36283b591",
"email": "newuser@example.com",
"name": "New User",
"contactPhone": "123456789",
"role": "user"
}

Менеджер (manager):

curl -X POST http://localhost:3000/api/admin/users \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <manager_token>" \
-d '{
"email": "newuser@example.com",
"password": "password123",
"name": "New User",
"contactPhone": "123456789",
"role": "user"
}'

response:
{
"statusCode": 403,
"message": "Insufficient permissions",
"error": "Forbidden"
}

Пользователь (user):
curl -X POST http://localhost:3000/api/admin/users \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <user_token>" \
-d '{
"email": "newuser@example.com",
"password": "password123",
"name": "New User",
"contactPhone": "123456789",
"role": "user"
}'

response:
{
"statusCode": 403,
"message": "Insufficient permissions",
"error": "Forbidden"
}



Получение списка пользователей (GET /api/admin/users или GET /api/manager/users)

Администратор (admin):
curl -X GET "http://localhost:3000/api/admin/users?limit=10&offset=0" \
-H "Authorization: Bearer <admin_token>"

response:
[{
"id": "60af924ff2e4e8b36283b591",
"email": "user1@example.com",
"name": "User One",
"contactPhone": "123456789"
},
{
"id": "60af924ff2e4e8b36283b592",
"email": "user2@example.com",
"name": "User Two",
"contactPhone": "987654321"
}]

Менеджер (manager):
curl -X GET "http://localhost:3000/api/manager/users?limit=10&offset=0" \
-H "Authorization: Bearer <manager_token>"
[{
"id": "60af924ff2e4e8b36283b591",
"email": "user1@example.com",
"name": "User One",
"contactPhone": "123456789"
},
{
"id": "60af924ff2e4e8b36283b592",
"email": "user2@example.com",
"name": "User Two",
"contactPhone": "987654321"
}]

Пользователь (user):
curl -X GET "http://localhost:3000/api/admin/users?limit=10&offset=0" \
-H "Authorization: Bearer <user_token>"

response:
{
"statusCode": 403,
"message": "Insufficient permissions",
"error": "Forbidden"
}
