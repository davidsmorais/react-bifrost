import { RealmConfig } from './typings';
declare const useBifrost: ({ config, currentRealm }: {
    config?: RealmConfig | undefined;
    currentRealm?: string | undefined;
}) => {
    realmList: string[];
    openRealm: (realmName?: string | undefined) => void;
    closeRealm: (realmName?: string | undefined) => void;
    state: any;
    props: any;
    setRealmsProps: (update: {} | ((prev: {}) => {})) => void;
    setRealmsState: (update: {} | ((prev: {}) => {})) => void;
    realmIsOpen: any;
    t: (key: string) => string;
};
export default useBifrost;
