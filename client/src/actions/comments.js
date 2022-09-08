import * as api from "../api/api"
import { ADD_COMMENT, END_LOADING, FETCH_COMMENTS, START_LOADING } from "../constants/actionTypes"

export const fetchComments = (id) => async (dispatch) => {
    try {
        // dispatch({ type: START_LOADING })
        const { data } = await api.fetchComments(id)
        dispatch({ type: FETCH_COMMENTS, payload: data })
        // dispatch({ type: END_LOADING })
    } catch (err) {
        console.log(err)
    }
}

export const addComment = (comment, id) => async (dispatch) => {
    try {
        const { data } = await api.addComment(comment, id)
        dispatch({ type: ADD_COMMENT, payload: data })
    } catch (err) {
        console.log(err)
    }
}

