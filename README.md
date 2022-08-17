# react-bifrost

> A React library that bridges multiple frameworks/events inside the same app.

[![NPM](https://img.shields.io/npm/v/dm-react-bifrost.svg)](https://www.npmjs.com/package/dm-react-bifrost) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

![Logo](docs/logo.png)


## Install

```bash
yarn install --save dm-react-bifrost
```

## Introduction
React Bifrost is a React library that acts as a bridge between two frameworks running inside the same web app. It was specially developed because I wanted to use React to develop the UI for my game, [Epoch Rift]( https://epochrift.com/).

React Bifrost uses the term 'realms' to refer to scenes which usually are composed of multiple React components. Each realm should can be opened or closed depending on what your needs.

Bifrost is built using [Recoil](https://recoiljs.org/) for state management with an atomic model.
## Usage

Initialize Bifrost in your React application by doing this on your entry point.

To setup Bifrost you simply need to render the Bifrost container in your React application.

```jsx
import {BifrostContainer} from 'dm-react-bifrost';

const App = () => {
  return <BifrostContainer config={config} />;
};
```

## Documentation
Head over to our [Documentation Page](https://hyperdocs.netlify.app/react-bifrost) to learn more about Bifrost.
## Projects

- [Epoch Rift 🟢](https://epochrift.com)
- [Phaser Bifrost Template](https://github.com/Dark-Magic-Studios/phaser-bifrost-vite-template-ts)

Let me know if you want to feature your project in here
## License

MIT © [davidsmorais](https://github.com/davidsmorais)
