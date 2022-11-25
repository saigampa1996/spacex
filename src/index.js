// External imports
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Local imports
import App from './App'
import rootReducer from './reducers'
import 'bootstrap/dist/css/bootstrap.min.css'

// Assets
import './index.css'
import { BrowserRouter } from 'react-router-dom'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)