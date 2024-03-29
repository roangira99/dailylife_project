import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Icon from './icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { AUTH } from '../../constants/actionTypes';
import useStyles from './styles';
import Input from './Input';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const classes = useStyles();
  const [isSignup, setIsSignUp] = useState(false);
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault(); // to prevent the browser from refreshing when on form submit
    
    if(isSignup) {
        dispatch(signup(form, navigate))
    } else {
        dispatch(signin(form, navigate))
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const switchmode = () => {
    setForm(initialState);
    setIsSignUp((prevIsSignup) => !prevIsSignup);
    setShowPassword(false)
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
        dispatch({ type: AUTH, data: { result, token } });

        navigate.push('/');
    } catch (error) {
        console.log(error);
    }
  };        

  const googleError = () => alert('Google Sign In was unsuccessful. Try again later.');

  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevtion={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>                                
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type ="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type ={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/> }
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  {isSignup ? 'Sign Up' : 'Sign In'}
                </Button>
                <GoogleLogin
                    clientId='1043612450601-d60p4ts38d0judqrisjq4lujoscsrgtn.apps.googleusercontent.com'
                    render={(renderProps) => (
                        <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disable} startIcon={<Icon />} variant ="contained">
                                Google Sign In
                            </Button>
                    )} 
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy="single_host_origin"
                    />
                <Grid container justify="flex-end">
                      <Grid item>
                          <Button onClick={switchmode}>
                              {  isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                          </Button>
                      </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  );
};

export default SignUp;