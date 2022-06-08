import {combineReducers} from 'redux'

import token from './token'
import user from './user'
import authStatus from './authStatus'

export default combineReducers({ token, user, authStatus})