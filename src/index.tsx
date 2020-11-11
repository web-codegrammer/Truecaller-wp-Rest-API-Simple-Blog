import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import ErrorBoundary from './components/common/ErrorBoundary'
import Store from './store'

ReactDOM.render(
    <ErrorBoundary>
        <Provider store={Store}>
            <App />
        </Provider>
    </ErrorBoundary>, 
    document.getElementById('root')
)
