import { Avatar, Container, Typography, Paper, Grid, Button } from "@material-ui/core"
import LockOutLinedIcon from "@material-ui/icons/LockOutlined"
import { useState } from "react"
import Input from "./Input"
import useStyles from './styles'
import { GoogleLogin } from "@react-oauth/google"
import jwt_decode from 'jwt-decode'
import { useDispatch } from "react-redux"
import { AUTH } from "../../constants/actionTypes"
import { useNavigate } from "react-router-dom"
import { signin, signup } from '../../actions/auth'

function Auth() {

    const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

    const [isSignUp, setIsSignUp] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(initialState)
    const classes = useStyles()
    const handleShowPassword = () => setShowPassword(!showPassword)
    const signInText = "Already have an account? Sign In"
    const signUpText = "Don't have an account? Sign Up"
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const switchMode = () => {
        setFormData(initialState)
        setIsSignUp((prevIsSignUp) => !prevIsSignUp)
        setShowPassword(false)
    }

    const onSuccess = async (res) => {
        console.log('Google Login was successful')
        const data = jwt_decode(res.credential)
        dispatch({ type: AUTH, payload: { result: data, token: res.credential } })
        navigate('/')
    }

    const onError = (err) => {
        console.log(err)
        console.log("Google Sign In was unsuccessful. Try again later!")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutLinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="email" label="Email" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button className={classes.submit} type="submit" fullWidth variant="contained" color="primary">{isSignUp ? 'Sign Up' : 'Sign In'}</Button>

                    <GoogleLogin
                        logo_alignment="center"
                        onSuccess={onSuccess}
                        onError={onError}
                    />

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp ? signInText : signUpText}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container >
    )
}
export default Auth