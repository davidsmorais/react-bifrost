import { RealmConfig } from './typings';
export declare const realmStateAtom: import("recoil").RecoilState<{}>;
declare const useBifrost: ({ config, init }: {
    config?: RealmConfig | undefined;
    init: boolean;
}) => {
    renderRealms: (JSX.Element | undefined)[];
    openRealm: (realmName: string, state: any, props: any) => Promise<void>;
    closeRealm: (realmName?: string | undefined) => Promise<void>;
    updateRealmProps: (realmName: string, props: any) => Promise<void>;
    state: {};
    props: {};
};
export default useBifrost;
