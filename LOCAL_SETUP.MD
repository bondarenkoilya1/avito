# Локальный запуск проекта

---
1. Установите [Ollama](https://ollama.com/download)
2. Загрузите модель:
```bash
ollama pull llama3
```
3. Убедитесь, что Ollama запущена:
```bash
ollama serve
```
---
Создайте `server/.env`:
```
PORT=5555
```

Создайте `client/.env`:
```
VITE_API_URL=http://localhost:5555
VITE_OLLAMA_API_URL=http://localhost:11434/api
```

#### Сервер
```bash
cd server
```  

```bash
npm install
```  
```bash
npm start
```  

#### Клиент
```bash
cd client
```
```bash
bun install
```
```bash
bun run dev
```
