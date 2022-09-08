import posts from './posts'
import auth from './auth'
import comments from './comment'
import { combineReducers } from 'redux'

export default combineReducers({ posts, auth, comments })