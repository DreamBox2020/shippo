export enum ENV {
  local = 'local',
  development = 'development',
  production = 'production'
}

export interface IConfig {
  ENV: ENV
  BASE_API: string
  OFFIACCOUNT_APP_ID: string
}

export const defineConfig = (config: IConfig): IConfig => config

export class Config implements IConfig {
  public readonly ENV: ENV
  public readonly BASE_API: string
  public readonly OFFIACCOUNT_APP_ID: string

  public constructor(config: IConfig) {
    this.ENV = config.ENV
    this.BASE_API = config.BASE_API
    this.OFFIACCOUNT_APP_ID = config.OFFIACCOUNT_APP_ID
  }

  public isLocal(): boolean {
    return this.ENV === ENV.local
  }

  public isDevelopment(): boolean {
    return this.ENV === ENV.development
  }

  public isProduction(): boolean {
    return this.ENV === ENV.production
  }

  public isMiniProgram(): boolean {
    return window.navigator.userAgent.includes('miniProgram')
  }
}
