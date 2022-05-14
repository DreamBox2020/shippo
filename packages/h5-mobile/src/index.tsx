import './utils/bootstrap'
import { Root } from '~/components/root'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(<Root />)
