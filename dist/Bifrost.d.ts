import { RealmConfig } from './typings';
declare class Bifrost {
    config: RealmConfig;
    bus: Element;
    realmList: string[];
    language: string;
    locales: string[];
    locale: string;
    state: any;
    constructor(config: RealmConfig);
    setLocale(locale: string): void;
    openRealm(name: string, { state, props }: {
        state: any;
        props: any;
    }): void;
    updateRealm(name: string, { props }: {
        props: any;
    }): void;
    closeRealm(name: string): void;
    /**
     * Add an event listener.
     */
    addEventListener(event: any, callback: any): void;
    /**
     * Remove an event listener.
     */
    removeEventListener(event: any, callback: any): void;
    /**
     * Dispatch an event.
     */
    dispatchEvent(event: any, ...args: any[]): void;
    translate(key: string, scene?: string): string;
}
export default Bifrost;
