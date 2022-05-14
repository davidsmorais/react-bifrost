import { RecoilRoot } from 'recoil'

import { RealmConfig } from './typings'
import useBifrost from './useBifrost'

const get = (obj, path, def) =>
  (() =>
    typeof path === 'string'
      ? path.replace(/\[(\d+)]/g, '.$1')
      : path.join('.'))()
    .split('.')
    .filter(Boolean)
    .every((step) => (obj = obj[step]) !== undefined)
    ? obj
    : def

export { get }

const BifrostApp = ({ config }: { config: RealmConfig }) => {
  const { BifrostContainer } = useBifrost({ config })
  return <BifrostContainer />
}

export const RecoilBifrostContainer = ({ config }: { config: RealmConfig }) => {
  return (
    <RecoilRoot>
      <BifrostApp config={config} />
    </RecoilRoot>
  )
}
