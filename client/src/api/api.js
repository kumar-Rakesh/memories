import axios from 'axios'

// const url = 'https://memories-learning-smart.herokuapp.com/posts'
const url = 'http://localhost:5000'

const API = axios.create({ baseURL: url })

API.interceptors.request.use(req => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req
})

export const fetchPost = async (id) => API.get(`/posts/${id}`)

export const fetchPosts = async (page) => API.get(`/posts?page=${page}`)

export const findPosts = async (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search}&tags=${searchQuery.tags}`)

export const fetchComments = async (id) => API.get(`/posts/${id}/comment`)

export const addComment = async (comment, id) => API.post(`/posts/${id}/comment`, comment)

export const addPost = async (post) => API.post('/posts', post)

export const updatePost = async (id, post) => API.patch(`/posts/${id}`, post)

export const deletePost = async (id) => API.delete(`/posts/${id}`)

export const likePost = async (id) => API.patch(`posts/${id}/like`)

export const signup = async (formData) => API.post('/posts/auth/signup', formData)

export const signin = async (formData) => API.post('/posts/auth/signin', formData)