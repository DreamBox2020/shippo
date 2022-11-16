export enum ENV {
  local = 'local',
  development = 'development',
  production = 'production',
}

export interface IConfig {
  ENV: ENV
  BASE_API: string
  OFFIACCOUNT_APP_ID: string
}

export const defineConfig = (config: IConfig): IConfig => config
