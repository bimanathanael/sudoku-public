import  { combineReducers, createStore, applyMiddleware } from 'redux'
import Thunk from 'redux-thunk'
import { sudokuReducers } from './reducers/sudokuReducer'

const reducers = combineReducers({ sudokuReducers})

export const store = createStore(reducers, applyMiddleware(Thunk) ) 