import React, { useEffect, useState } from 'react'
import { Typography, TextField, Button, Paper } from '@material-ui/core'
import useStyles from '../styles'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, fetchComments } from '../../../actions/comments'

function CommentSection({ post }) {

    const classes = useStyles()
    const [comment, setComment] = useState('')
    const { comments } = useSelector(state => state.comments)
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchComments(post._id))
    }, [])

    const handleClick = () => {
        dispatch(addComment({ comment: comment }, post._id))
        setComment('')
    }

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle2">
                            <strong>{c.creator.name}</strong>: {c.comment}
                        </Typography>
                    ))}
                </div>

                {user && (

                    <div style={{ width: '70%' }}>
                        <Typography gutterBottom variant="h6">Write a comment</Typography>
                        <TextField
                            fullWidth
                            rows={4}
                            variant="outlined"
                            label="Comment"
                            multiline
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <br />
                        <br />
                        <Paper raised elevation={6}>
                            <Button
                                // style={{ margin: "10px" }}
                                fullWidth
                                disabled={!comment?.length}
                                color="primary"
                                variant="contained"
                                onClick={handleClick}
                            >
                                Comment
                            </Button>
                        </Paper>
                    </div>
                )}
            </ div>
        </div>
    )
}

export default CommentSection