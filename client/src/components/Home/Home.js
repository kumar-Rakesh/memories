import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getPosts } from '../../actions/posts';
import Pagination from '../Pagination/Pagination'
import ChipInput from 'material-ui-chip-input'
import useStyles from './styles'
import { findPosts } from '../../actions/posts'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function Home() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(null)
    const query = useQuery()
    const navigate = useNavigate()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    const searchPost = () => {
        if (search.trim() || tags.length > 0) {
            dispatch(findPosts({ search: search.trim() || 'none', tags: tags.join(',') || 'none' }))
            navigate(`/posts/search?searchQuery=${search.trim() || 'none'}&tags=${tags.join(',') || 'none'}`)
        } else {
            navigate('/')
        }
    }

    const handleKeyCapture = (e) => {
        if (e.key.value === 13) {
            searchPost()
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag])
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter(tag => tag !== tagToDelete))
    }

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-evenly" align-items="stretch" spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField
                                name='search'
                                variant='outlined'
                                label='Search Memories'
                                fullWidth
                                value={search}
                                onChange={(e) => { setSearch(e.target.value) }}
                                onKeyUpCapture={handleKeyCapture}
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} color="primary" variant="contained">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />

                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}


                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home