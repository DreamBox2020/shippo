export interface IUserStore {
  info: { uid: number }
}

export const userStore: IUserStore = {
  info: { uid: 0 },
}
