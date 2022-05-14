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

#### Example Configuration
```tsx
const config = {
  dimensions: {
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
  locales: {
    en: {
      Title: {
        title: "Knight Game Example",
        subtitle: "Phaser + React Bifrost",
        newGame: "New Game",
      },
      Hud: {
        damage: "Damage",
      },
      GameOver: {
        gameOver: "Game Over",
        restart: "Restart Game",
      },
    },
  },
  realms: {
    Title: TitleRealm,
    Hud: HudRealm,
    GameOver: GameOverRealm,
  },
};
```

## On Phaser Side 🎮

### Open a realm and pass props
```tsx
    window.Bifrost.openRealm("Title", {
      props: {
        onStartGame: () => {
          this.startGame();
          window.Bifrost.closeRealm("Title");
        },
      },
    });
```
### Close Realm
```tsx
    window.Bifrost.closeRealm("Title");
```
### Update Realm Props

```tsx
      window.Bifrost.updateRealm("Hud", {
        props: {
          width: (this.player.stats.hp * 100) / this.player.stats.maxHp,
          pressBtn: loseHpCallback,
        },
      });
```
### TODO ⚠️
## Examples
Refer to [Phaser Bifrost Template](https://github.com/Dark-Magic-Studios/phaser-bifrost-vite-template-ts) for complete usage examples

### Title Screen
On Phaser side:
```ts
// TitleScene.ts
export default class TitleScene extends Phaser.Scene {
  public init(): void {
    window.Bifrost.openRealm("Title", {
      state: { open: true },
      props: {
        onClose: () => {
          this.startGame();
          window.Bifrost.closeRealm("Title");
        },
      },
    });
  }
  ...
}
```
On React side:
```tsx
// TitleRealm.tsx
interface RealmProps {
  onClose: () => void;
}

const TitleRealm = ({open, t, onClose}: RealmProps) => {
  if (!open) {
    return null;
  }
  return (
    <div style={{}}>
      <h1>{t("title")}</h1>
      <h3>{t("subtitle")}</h3>
      <button onClick={props?.onClose}>
        <h2>{t("newGame")}</h2>
      </button>
    </div>
  );
};

export default TitleRealm;

```
## Projects

- [Epoch Rift 🟢](https://epochrift.com)
- [Phaser Bifrost Template](https://github.com/Dark-Magic-Studios/phaser-bifrost-vite-template-ts)

Let me know if you want to feature your project in here
## License

MIT © [davidsmorais](https://github.com/davidsmorais)
