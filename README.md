# Digital Plant — сайт проекта

Сайт ООО «Цифровой завод». Демонстрационный многостраничный сайт платформы
цифрового производства.
Статические HTML/CSS/JS без сборки, зависимостей и внешних ресурсов: страницы
работают из папки, из локального сервера и на GitHub Pages.

## Структура

```
my-site-Digital-Plant/
  index.html            — Обзор (главная)
  platform.html         — Платформа: модули, архитектура, границы
  implementation.html   — Внедрение: этапы, требования, пилот
  cases.html            — Практика: примеры проектов
  contacts.html         — Контакты и частые вопросы
  404.html              — Страница ошибки для GitHub Pages
  assets/styles.css     — все стили (токены, сетки, адаптив)
  assets/site.js        — мобильное меню, интерактивный контур, появление блоков
  README.md
```

Входной файл — `index.html`.

## Локальный просмотр

Достаточно открыть `index.html` в браузере. Для проверки относительных ссылок
между страницами удобнее локальный сервер:

```
python -m http.server 8000
```

и затем `http://127.0.0.1:8000/`.

## Проверки

```
multitool-node --skill websites site.cjs check-directory my-site-Digital-Plant
multitool-node --skill websites verify.cjs my-site-Digital-Plant/index.html --actions actions.json
```

## Что заменить перед публикацией

- Контакты на `contacts.html`: почта, телефон, адрес, часы работы (сейчас заглушки в домене `.example`).
- Тексты про конкретное производство: состав оборудования, реальные показатели, названия предприятий в разделе «Практика» (сейчас примеры иллюстративные).
- Заголовок и описание сайта в `<head>` каждой страницы, если изменится название проекта.
- Ссылки на репозиторий в подвале: сейчас указан `github.com/palermad/my-site-Digital-Plant`.

## Публикация на GitHub Pages

Репозиторий: `https://github.com/palermad/my-site-Digital-Plant`

Файлы лежат в корне репозитория, поэтому публикация — это ветка `main` и
включённые Pages:

1. `git init`, `git add .`, `git commit -m "Сайт Digital Plant"`.
2. `git remote add origin https://github.com/palermad/my-site-Digital-Plant.git`.
3. `git push -u origin main`.
4. На GitHub: Settings → Pages → Source: «Deploy from a branch», ветка `main`,
   папка `/ (root)`.

Адрес сайта после публикации: `https://palermad.github.io/my-site-Digital-Plant/`.

## Ограничения

- Формы отправки нет: обратной связи на стороне сервера у статического сайта
  не существует, поэтому на странице контактов указана почта.
- Внешних шрифтов и CDN нет — сайт работает без интернета.
