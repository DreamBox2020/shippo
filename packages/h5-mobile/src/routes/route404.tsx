import { config } from '~/config'
import { Route } from './helpers'

import { Navigate } from 'react-router-dom'

export const route404 = new Route(
  '/*',
  <Navigate to={config.isMiniProgram() ? '/wx' : '/home'} replace />
)
