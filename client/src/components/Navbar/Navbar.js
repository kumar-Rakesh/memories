import decode from 'jwt-decode'
import { Container, AppBar, Typography, Grow, Grid, Toolbar, Avatar, Button } from '@material-ui/core'
import memoriesLogo from '../../images/memoriesLogo.png'
import memoriesText from '../../images/memoriesText.png'
import useStyles from './styles'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LOGOUT } from '../../constants/actionTypes'
import { useDispatch, useSelector } from 'react-redux'


function Navbar() {

    const classes = useStyles()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const logout = () => {
        dispatch({ type: LOGOUT, payload: null })
        setUser(null)
        navigate('/')
    }

    useEffect(() => {
        const token = user?.token
        if (token) {
            const decodedToken = decode(token)
            if (decodedToken * 1000 < new Date().getTime())
                logout()
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt="icon" height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="memories" height="60px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user?.result?.name} src={user?.result?.picture}>{user?.result?.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user?.result?.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to='/auth' variant="contained" color="primary">Login</Button>
                    )
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar