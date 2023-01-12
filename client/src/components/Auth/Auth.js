import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';

import Icon from './icon';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = () => {

  };

  const handleChange = () => {

  };

  const switchmode = () => {
    setIsSignUp((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false)
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
        
    } catch (error) {
        console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log('Google Sign In was unsuccessful. Try again later.');
  };

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
                                <Input name="firstName" label="First Name" handleChange={handleChange} half/>                                
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type ="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type ={showPassword ? "text" : "passowrd"} handleShowPassword={handleShowPassword}/>
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="passoword"/> }
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
                    onFailure={googleFailure}
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

export default Auth;