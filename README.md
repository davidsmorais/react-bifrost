# react-bifrost

> A React library that bridges multiple frameworks/events inside the same app.

[![NPM](https://img.shields.io/npm/v/dm-react-bifrost.svg)](https://www.npmjs.com/package/dm-react-bifrost) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![Logo](docs/logo.png)


## Install

```bash
yarn install --save react-bifrost
```

## Introduction
React Bifrost is a React library that acts as a bridge between two frameworks running inside the same web app. It was specially developed because I wanted to use React to develop the UI for my game, [Epoch Rift]( https.//epochrift.com/).

## Usage

Initialize Bifrost in your React application by doing this on your entry point:
```tsx
useBifrost({
    config: {
      realms: {
        [RealmName: string]: React.FC
      }
      locales: {
        [Language: string]: {
          [RealmName: string]: {
            [Key: string]: string
          }
        }
      }
      dimensions: {
        height: number
        width: number
      }
      controllers: {
        keyboard: boolean,
        gamepad: boolean,
      }
    }
  });
```
### TODO ⚠️
## Examples
### TODO ⚠️
## Projects

- [Epoch Rift 🟢](https://epochrift.com)
- [Phaser Bifrost Template](https://github.com/Dark-Magic-Studios/phaser-bifrost-vite-template-ts)

Let me know if you want to feature your project in here
## License

MIT © [davidsmorais](https://github.com/davidsmorais)
