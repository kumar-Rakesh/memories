import * as api from "../api/api"
import { CREATE, FETCH_ALL, UPDATE, DELETE, LIKE, START_LOADING, END_LOADING, FETCH_POST } from "../constants/actionTypes"

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPost(id)
        dispatch({ type: FETCH_POST, payload: data })
        dispatch({ type: END_LOADING })
    } catch (err) {
        console.log(err)
    }
}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.fetchPosts(page)
        dispatch({ type: FETCH_ALL, payload: data })
        dispatch({ type: END_LOADING })
    } catch (err) {
        console.log(err)
    }
}

export const findPosts = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data: { data } } = await api.findPosts(searchQuery)
        dispatch({ type: FETCH_ALL, payload: { data } })
        dispatch({ type: END_LOADING })
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        const { data } = await api.addPost(post)
        dispatch({ type: CREATE, payload: data })
        navigate(`/posts/${data._id}`)
    } catch (err) {
        console.log(err)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: UPDATE, payload: data })
    } catch (err) {
        console.log(err)
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({ type: DELETE, payload: id })
    } catch (err) {
        console.log(err)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: LIKE, payload: data })
    } catch (err) {
        console.log(err)
    }
}
