export interface IUserStore {
    info: {
        uid: number;
    };
}
export declare const userReducer: (store: IUserStore | undefined, action: import("@kazura/react-store").StoreAction<IUserStore>) => IUserStore;
