/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useCallback } from 'react'

import { atom, useRecoilState, useRecoilCallback } from 'recoil'

import Bifrost from './Bifrost'
import { RealmConfig } from './typings'

export const realmStateAtom = atom({
  key: 'realmsState',
  default: {}
})

const realmPropsAtom = atom({
  key: 'realmsProps',
  default: {}
})

const useBifrost = ({
  config,
  init
}: {
  config?: RealmConfig
  init: boolean
}) => {
  const realms = config?.realms ?? {}
  const [realmsState, setRealmsState] = useRecoilState(realmStateAtom)
  const [realmsProps, setRealmsProps] = useRecoilState(realmPropsAtom)
  const openRealm = useRecoilCallback(
    ({ snapshot }) =>
      async (realmName: string, state: any, props: any) => {
        const rs = await snapshot.getPromise(realmStateAtom)
        const rp = await snapshot.getPromise(realmPropsAtom)
        const realm = realmName
        if (realm) {
          const newRs = {
            ...rs,
            [realm]: {
              ...(rs[realm] || {}),
              ...state,
              open: true
            }
          }
          setRealmsState(newRs)
          const newP = {
            ...rp,
            [realm]: {
              ...(rp[realm] || {}),
              ...props
            }
          }
          setRealmsProps(newP)
        } else {
          console.error(
            '❗Bifrost Error❗ openRealm failed 👉 currentRealm not set and realmName not passed'
          )
        }
      },
    [realmStateAtom, realmPropsAtom]
  )
  const navigateToRealm = useRecoilCallback(
    ({ snapshot }) =>
      async (realmName: string, props: any) => {
        const realm = realmName

        if (realm) {
          const rs = await snapshot.getPromise(realmStateAtom)
          const rp = await snapshot.getPromise(realmPropsAtom)
          const newRealmState = JSON.parse(JSON.stringify(rs))
          Object.keys(newRealmState).forEach((realm) => {
            if (newRealmState[realm]?.open) {
              newRealmState[realm].open = false
            }
          })
          setRealmsState({
            ...rs,
            [realm]: {
              ...(rs[realm] || {}),
              open: true
            }
          })
          const newP = {
            ...rp,
            [realm]: {
              ...(rp[realm] || {}),
              ...props
            }
          }
          setRealmsProps(newP)
        } else {
          console.error(
            '❗Bifrost Error❗ closeRealm failed 👉 currentRealm not set and realmName not passed'
          )
        }
      },
    [realmStateAtom, realmPropsAtom]
  )

  const closeRealm = useRecoilCallback(
    ({ snapshot }) =>
      async (realmName?: string) => {
        const realm = realmName

        if (realm) {
          const rs = await snapshot.getPromise(realmStateAtom)
          const rp = await snapshot.getPromise(realmPropsAtom)
          setRealmsState({
            ...rs,
            [realm]: {
              ...(rs[realm] || {}),
              open: false
            }
          })
          const newP = {
            ...rp,
            [realm]: {}
          }
          setRealmsProps(newP)
        } else {
          console.error(
            '❗Bifrost Error❗ closeRealm failed 👉 currentRealm not set and realmName not passed'
          )
        }
      },
    [realmStateAtom, realmPropsAtom]
  )
  const updateRealmProps = useRecoilCallback(
    ({ snapshot }) =>
      async (realmName: string, props: any) => {
        const realm = realmName
        if (realm) {
          const rp = await snapshot.getPromise(realmPropsAtom)
          setRealmsProps({
            ...rp,
            [realm]: {
              ...(rp[realm] || {}),
              ...props
            }
          })
        } else {
          console.error(
            '❗Bifrost Error❗ closeRealm failed 👉 currentRealm not set and realmName not passed'
          )
        }
      },
    [realmStateAtom, realmPropsAtom]
  )

  const getRealmProps = useCallback(
    (realm: string) => realmsProps[realm],
    [realmsProps]
  )
  const renderRealms = Object.keys(realms).map((realm) => {
    const Realm = config?.realms[realm]
    const realmOpen = realmsState[realm]?.open
    const realmProps = getRealmProps(realm)
    if (realmOpen && Realm) {
      return (
        <Realm
          open={realmOpen}
          key={realm}
          {...realmProps}
          t={(key: string) => window.Bifrost.translate(key, realm)}
        />
      )
    }
  })
  if (!window.Bifrost && config && init) {
    window.Bifrost = new Bifrost(config)
    window.Bifrost.bus.addEventListener('bifrost-open', ({ detail }: any) => {
      const { name, state, props } = detail

      openRealm(name, state, props)
    })
    window.Bifrost.bus.addEventListener('bifrost-close', ({ detail }: any) => {
      const { name } = detail
      closeRealm(name)
    })
    window.Bifrost.bus.addEventListener(
      'bifrost-navigate',
      ({ detail }: any) => {
        const { name, props } = detail
        navigateToRealm(name, props)
      }
    )

    window.Bifrost.bus.addEventListener('bifrost-update', ({ detail }: any) => {
      const { name, props } = detail
      updateRealmProps(name, props)
    })
  }

  return {
    renderRealms,
    openRealm,
    closeRealm,
    updateRealmProps,
    navigateToRealm,
    state: realmsState,
    props: realmsProps
  }
}

export default useBifrost
