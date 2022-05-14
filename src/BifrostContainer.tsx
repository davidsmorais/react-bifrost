import { RecoilRoot } from 'recoil'

import { RealmConfig } from './typings'
import useBifrost from './useBifrost'

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

export default RecoilBifrostContainer
