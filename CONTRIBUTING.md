# Panduan Kontribusi

## Code Style

### TypeScript
- Gunakan `strict: true` di tsconfig.json
- Type semua functions dan variables
- Avoid `any` type

### React
- Gunakan functional components dengan hooks
- Props harus di-type dengan interface/type
- Gunakan custom hooks untuk reusable logic

### Backend
- Follow Express.js best practices
- Gunakan middleware untuk cross-cutting concerns
- Implement proper error handling
- Validate input dengan express-validator

## Commit Message

Gunakan format berikut:
- `feat: Add new feature`
- `fix: Fix a bug`
- `docs: Update documentation`
- `style: Code style changes`
- `refactor: Refactor code`
- `test: Add or update tests`
- `chore: Maintenance tasks`

## Pull Request

1. Fork repository
2. Buat branch feature: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'feat: Add AmazingFeature'`
4. Push ke branch: `git push origin feature/AmazingFeature`
5. Buat Pull Request

## Testing

- Tulis unit tests untuk business logic
- Minimal 80% code coverage
- Jalankan tests sebelum commit: `npm test`

