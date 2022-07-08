import local from './local.config'
import development from './development.config'
import production from './production.config'
import { ENV, Config } from './define'

const init = (env: ENV) => {
  switch (env) {
    case ENV.local:
      return new Config(local)
    case ENV.development:
      return new Config(development)
    case ENV.production:
      return new Config(production)
    default:
      throw new Error('Unknown env')
  }
}

export const config = init(import.meta.env.VITE_ENV)
