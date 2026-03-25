# Avito. Тестовое задание. Весна 2026

## Клонирование 
```bash
git clone git@github.com:bondarenkoilya1/avito.git
```
 или по HTTPS
```bash
git clone https://github.com/bondarenkoilya1/avito.git
```
---
Переход в директорию
```bash
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

--- 
### Локально

Подробная инструкция находится в [LOCAL_SETUP.MD](./LOCAL_SETUP.MD)

---
## Стек (технологии на выбор)

- Ant Design
- Не использовал стейт-менеджеры. Вместо этого пользовался встроенными queryParams, useContext
- Вместо React Hook Form и Zod использовал встроенный функционал Ant Design

## Принятые решения

- Выбрал Ollama на роль LLM. <br>
В душе интересно пощупать GigaChat API, а так как он еще и дает 1 миллион бесплатных токенов, 
то если останется время - попытаюсь реализовать двумя способами ради любопытства. 
- Добавил в DTO /items поле id на стороне сервера: для выбора карточки по ID, указания правильного ключа при переборе через .map()
- Добавил CORS-обработку: методы, заголовки и Preflight
- Добавил сортировку по цене на сервере
- Добавил `host: '0.0.0.0'` чтобы сервер был доступен снаружи контейнера
---
> [!TIP]
> Я разбивал проект на маленькие задачи и планировал с помощью доски от GitHub. <br>
> Посмотреть на нее можете по [ссылке](https://github.com/users/bondarenkoilya1/projects/7)
