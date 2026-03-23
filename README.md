# Avito. Тестовое задание. Весна 2026

## Клонирование
```bash
git clone https://github.com/bondarenkoilya1/avito.git
# или по SSH
git clone git@github.com:bondarenkoilya1/avito.git

cd avito
```

## Запуск

### Через Docker

1. Установите [Docker](https://docs.docker.com/get-started/get-docker/)
2. В корне проекта выполните:
```bash
docker compose up --build
```
3. Клиент: http://localhost:5173
4. Сервер: http://localhost:5555

> Зависимости устанавливаются автоматически внутри контейнеров

### Локально

#### Сервер
```bash
cd server
npm install
npm start
```

#### Клиент
```bash
cd client
bun install
bun run dev
```

Создайте `server/.env`:
```
PORT=5555
```

Создайте `client/.env`:
```
VITE_API_URL=http://localhost:5555
```



## Стек (технологии на выбор)

- Ant Design

## Принятые решения

- Добавил в DTO /items поле id на стороне сервера чтобы было удобно указывать ключ при проходе по массиву через .map()