# Examples

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

## React Usage

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

### Other Examples
Refer to [Phaser Bifrost Template](https://github.com/Dark-Magic-Studios/phaser-bifrost-vite-template-ts) for complete usage examples

## Projects

- [Epoch Rift 🟢](https://epochrift.com)
- [Phaser Bifrost Template](https://github.com/Dark-Magic-Studios/phaser-bifrost-vite-template-ts)

Let me know if you want to feature your project in here 🚀
