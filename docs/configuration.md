## Configuration

Configuration for Bifrost is pretty straightforward for now. You simply need to pass the game dimensions and the realms.

Realms are the UI scenes that are rendered conditionallyt whenever `Bifrost.openRealm` is called and should be React components.

Locales is optional and is used to localize the UI.

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
