import Bifrost from './Bifrost'

export interface RealmConfig {
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

export interface BifrostProps<T> {
  props: T
  state: {
    [stateKey: string]: any
  }
  realmIsOpen: boolean
  t: (key: string) => string
}

declare global {
  interface Window {
    Bifrost: Bifrost
  }
}

export {}
