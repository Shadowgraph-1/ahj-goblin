# AHJ Goblins Game

> Интерактивная мини-игра, реализованная с использованием классов, Webpack и GitHub Actions для деплоя на GitHub Pages

[![CI](https://github.com/<your-username>/<your-repo>/actions/workflows/deploy.yml/badge.svg)](https://github.com/<your-username>/<your-repo>/actions/workflows/deploy.yml)

## Описание

Игрок должен ловить гоблинов кликом — гоблин появляется на 1 секунду в случайной ячейке. Если игрок пропустил 5 раз, игра заканчивается. Счет отображается в header.

## Использование

Убедитесь, что установлен yarn.

```powershell
cd c:\Users\SGraph\Desktop\ahj_goblins
yarn install
yarn start
```

Сборка production:

```powershell
yarn build
```

## Деплой


 - Создайте репозиторий на GitHub и запушьте этот проект
 - В Actions workflow уже настроено деплой на GitHub Pages (ветка `gh-pages`), он будет собираться автоматически при push в ветку `main` или `master`.
 - После первого пуша обновите бейджик выше, заменив `<your-username>` и `<your-repo>` на ваш путь.
 - Страница GitHub Pages будет доступна по адресу: `https://<your-username>.github.io/<your-repo>/`.

## Файлы

- `src/` — исходники игры
- `src/game/` — логика приложения с классами `Game`, `Board`, `Cell`, `Scoreboard`
- `public/index.html` — HTML шаблон
- `webpack.config.js` — конфигурация Webpack

