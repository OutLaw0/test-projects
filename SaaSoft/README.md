## Accounts Form (Vue 3 + TS + Pinia + Element Plus)

### Установка и запуск

```bash
npm i   # или: yarn / pnpm
npm run dev
```

Откройте `http://localhost:5173`.

### Возможности
- Добавление/удаление записей
- Сохранение по блюру/изменению селекта
- Валидация: обязательные `Логин`, `Пароль` (только для «Локальная»)
- `Метки` хранятся как массив `{ text: string }` (разделитель `;`)
- Для `LDAP` пароль скрыт и сохраняется как `null`
- Данные сохраняются в `localStorage`

### Стек
- Vue 3 (Composition API)
- TypeScript
- Pinia
- Element Plus


