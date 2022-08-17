## API Documentation

## `new Bifrost(config)`
You need to instatiate Bifrost with a configuration object.
```ts
interface Config {
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

}
```
---
### `Bifrost.openRealm`
| Parameter   | Type     | Description                     |
| ----------- | -------- | ------------------------------- |
| `realmName` | `string` | The name of the realm to open   |
| `props`     | `object` | props being passed to the realm |


### `Bifrost.closeRealm`
| Parameter   | Type     | Description                    |
| ----------- | -------- | ------------------------------ |
| `realmName` | `string` | The name of the realm to close |

### `Bifrost.updateRealm`
| Parameter   | Type     | Description                           |
| ----------- | -------- | ------------------------------------- |
| `realmName` | `string` | The name of the realm to update       |
| `props`     | `object` | **Entire** props object being updated |

