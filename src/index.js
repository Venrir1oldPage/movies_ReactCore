import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'

import App from './components/App/App'

const root = createRoot(document.getElementById('root'))

root.render(<App />)