import React, { useState } from 'react'
import useStyles from './styles'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from "@material-ui/core"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt"
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz"
import moment from "moment"
import { deletePost, likePost } from "../../../actions/posts"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

function Post({ post, setCurrentId }) {

    const classes = useStyles()
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const openPost = () => { navigate(`/posts/${post._id}`) }

    function Likes() {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                    <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
                );
        }

        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    }

    return (
        <Card className={classes.card} raised elevation={6}>

            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="subtitle1">{post.creator.name}</Typography>
                <Typography variant="subtitle2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={classes.overlay2}>
                {((user?.result?.googleId === post?.creator?._id) || (user?.result?._id === post?.creator?._id)) && (
                    <Button style={{ color: "white" }} size="small" onClick={() => { setCurrentId(post._id) }}>
                        <MoreHorizIcon fontSize="default"></MoreHorizIcon>
                    </Button>
                )}
            </div>
            <ButtonBase className={classes.cardAction} onClick={openPost} >
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{post.tags.map(tag => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} gutterBottom variant="h6" component="h2">{post.title}</Typography>
                <CardContent>
                    <Typography variant="subtitle2" gutterBottom>{post.message}</Typography>
                </CardContent>
            </ButtonBase>
            <CardActions className={classes.cardActions}>
                <Button color="primary" size="small" disabled={!user?.result} onClick={() => { dispatch(likePost(post._id)) }}>
                    <Likes />
                </Button>
                {((user?.result?.googleId === post?.creator?._id) || (user?.result?._id === post?.creator?._id)) && (
                    <Button color="primary" size="small" onClick={() => { dispatch(deletePost(post._id)) }}>
                        <DeleteIcon fontSize="small" />
                        &nbsp; Delete
                    </Button>
                )}

            </CardActions>
        </Card>
    );
}

export default Post