# Blosk

This project is bootstrapped by [aurelia/new](https://github.com/aurelia/new).

## Start dev web server

    pnpm start

## Build the app

Build files to dist folder.

    pnpm run build

## Unit Tests

    pnpm run test

Run unit tests in watch mode.

    pnpm run test:watch

Unit tests run in browser through [browser-do](https://github.com/3cp/browser-do). Please check scripts in `package.json` for more details.

By default, browser-do shuts down browser after tests. To keep browser window open for inspection, pass additional argument `-k` or `--keep-open`.

    pnpm run build:test && browser-do -k --mocha --browser chrome < dist/entry-bundle.js

Unit tests in watch mode is executed through stand webpack watch mode and the help of [webpack-shell-plugin-next](https://github.com/s00d/webpack-shell-plugin-next).

## Analyze webpack bundle

    pnpm run analyze


# WIP