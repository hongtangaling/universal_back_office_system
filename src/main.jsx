import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//全局挂载redux
import { Provider} from 'react-redux'
import store from './store'
//挂载mock
import './api/mock'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>,
)
