import { Button, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';

function Form({ currentId, setCurrentId }) {
    const user = JSON.parse(localStorage.getItem('profile'))
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const emptyPost = {
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    }

    const [post, setPost] = useState(emptyPost)
    const selectedPost = useSelector(state => currentId ? state.posts.posts.find(p => p._id === currentId) : null)

    useEffect(() => {
        if (selectedPost) {
            setPost(selectedPost)
        }
    }, [selectedPost])

    const onChangeTitle = (e) => {
        setPost({
            ...post,
            title: e.target.value
        })
    }

    const onChangeMessage = (e) => {
        setPost({
            ...post,
            message: e.target.value
        })
    }

    const onChangeTags = (e) => {
        setPost({
            ...post,
            tags: e.target.value.split(",")
        })
    }

    const onDoneSelectedFile = ({ base64 }) => {
        setPost({
            ...post,
            selectedFile: base64
        })
    }

    const clear = () => {
        setCurrentId(null)
        setPost(emptyPost)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId) {
            dispatch(updatePost(currentId, post))
        } else {
            dispatch(createPost(post, navigate))
        }
        clear()
    }

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's memories.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Edit' : 'Create'} a Memory</Typography>
                <TextField name='title' variant='outlined' label='Title' fullWidth value={post.title} onChange={onChangeTitle} />
                <TextField name='message' variant='outlined' label='Message' rows={4} multiline fullWidth value={post.message} onChange={onChangeMessage} />
                <TextField name='tags' variant='outlined' label='Tags' fullWidth value={post.tags} onChange={onChangeTags} />
                <div className={classes.fileInput}><FileBase type='file' multiple={false} onDone={onDoneSelectedFile} /></div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button className={classes.buttonClear} variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper >
    );
}

export default Form