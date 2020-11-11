import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { history } from '../utils/router'
import blog from './reducers'

const reducers = { blog }

const routeMiddleware = routerMiddleware(history)

let middlewares = [routeMiddleware]

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose

const Store = createStore(combineReducers(reducers), composeEnhancers(applyMiddleware(...middlewares)))

export default Store
