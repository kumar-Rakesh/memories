import { AUTH, LOGOUT } from "../constants/actionTypes"

export default (state = { auth: null }, action) => {
    switch (action.type) {
        case AUTH:
            window.localStorage.setItem('profile', JSON.stringify({ ...action?.payload }))
            return { ...state, auth: action?.payload }
        case LOGOUT:
            window.localStorage.clear()
            return { ...state, auth: null }
        default:
            return state
    }
}