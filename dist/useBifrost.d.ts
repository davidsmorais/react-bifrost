import { RealmConfig } from './typings';
export declare const realmStateAtom: import("recoil").RecoilState<{}>;
declare const useBifrost: ({ config, currentRealm }: {
    config?: RealmConfig | undefined;
    currentRealm?: string | undefined;
}) => {
    BifrostContainer: () => JSX.Element;
    realmList: string[];
    openRealm: (realmName: string, state: any, props: any) => Promise<void>;
    closeRealm: (realmName?: string | undefined) => Promise<void>;
    updateRealmProps: (realmName: string, props: any) => Promise<void>;
    state: any;
    props: any;
    setRealmsProps: import("recoil").SetterOrUpdater<{}>;
    setRealmsState: import("recoil").SetterOrUpdater<{}>;
    realmIsOpen: any;
    t: (key: string) => string;
};
export default useBifrost;
