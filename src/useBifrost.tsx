import { useMemo } from 'react'
import { atom, useAtom } from 'jotai'
import Bifrost from './Bifrost'
import { RealmConfig } from './typings'

const realmStateAtom = atom({})
const realmPropsAtom = atom({})

const useBifrost = ({
  config,
  currentRealm
}: {
  config?: RealmConfig
  currentRealm?: string
}) => {
  const realms = config?.realms ?? {}
  const [realmsState, setRealmsState] = useAtom(realmStateAtom)
  const [realmsProps, setRealmsProps] = useAtom(realmPropsAtom)

  const openRealm = (realmName?: string) => {
    const realm = realmName || currentRealm
    if (realm) {
      setRealmsState({
        ...realmsState,
        [realm]: {
          ...(realmsState[realm] || {}),
          open: true
        }
      })
    } else {
      console.error(
        '❗Bifrost Error❗ openRealm failed 👉 currentRealm not set and realmName not passed'
      )
    }
  }

  const closeRealm = (realmName?: string) => {
    const realm = realmName || currentRealm
    if (realm) {
      setRealmsState({
        ...realmsState,
        [realm]: {
          ...(realmsState[realm] || {}),
          open: false
        }
      })
    } else {
      console.error(
        '❗Bifrost Error❗ closeRealm failed 👉 currentRealm not set and realmName not passed'
      )
    }
  }

  if (!window.Bifrost && config) {
    window.Bifrost = new Bifrost(config)
    window.Bifrost.bus.addEventListener('bifrost-open', ({ detail }: any) => {
      const { name, state, props } = detail
      if (state) {
        setRealmsState({
          ...realmsState,
          [name]: state
        })
      }
      if (props) {
        console.log('Has props', props, name)
        setRealmsProps({
          ...realmsProps,
          [name]: props
        })
      }
      openRealm(name)
    })
    window.Bifrost.bus.addEventListener('bifrost-close', ({ detail }: any) => {
      const { name } = detail
      closeRealm(name)
    })

    window.Bifrost.bus.addEventListener('bifrost-update', ({ detail }: any) => {
      const { name, props } = detail
      console.log('Updating realm', name, props)
      if (props) {
        setRealmsProps({
          ...realmsProps,
          [name]: props
        })
      }
    })
  }

  const currentRealmState = useMemo(
    () => (currentRealm ? realmsState[currentRealm] : realmsState),
    [realmsState]
  )
  const realmIsOpen = currentRealmState?.open ?? false
  const realmList = Object.keys(realms)
  const currentRealmProps = useMemo(
    () => (currentRealm ? realmsProps[currentRealm] : realmsProps),
    [realmsProps]
  )

  const t = (key: string) => {
    return window.Bifrost.translate(key, currentRealm)
  }

  const BifrostContainer = ({ ...props }) => {
    ;<div
      style={{
        position: 'absolute',
        width: '100vw',
        height: '100vh'
      }}
      {...props}
    >
      {realms}
    </div>
  }
  return {
    BifrostContainer,
    realmList,
    openRealm,
    closeRealm,
    state: currentRealm ? currentRealmState : realmsState,
    props: currentRealm ? currentRealmProps : realmsProps,
    setRealmsProps,
    setRealmsState,
    realmIsOpen,
    t
  }
}

export default useBifrost
