# Используем Node.js как базовый образ
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Собираем проект
RUN npm run build

# Указываем порт, который будет использоваться
EXPOSE 3000

# Команда для запуска приложения
CMD ["node", "dist/main"]
