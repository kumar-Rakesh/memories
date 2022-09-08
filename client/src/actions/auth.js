import * as api from "../api/api"
import { AUTH } from "../constants/actionTypes"

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signin(formData)
        dispatch({ type: AUTH, payload: data })
        navigate('/')
    } catch (err) {
        console.log(err)
        if (err.response.status === 401)
            window.alert('Invalid Email/Password')
        else
            window.alert('Something went wrong. Pls. try again later.')
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signup(formData)
        dispatch({ type: AUTH, payload: data })
        navigate('/')
    } catch (err) {
        console.log(err)
    }
} 