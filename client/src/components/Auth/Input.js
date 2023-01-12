import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';

import Visisbility from '@material-ui/icons/Visibility';
import VisisbilityOff from '@material-ui/icons/VisibilityOff';


const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
            name={name}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            InputProp={name === 'password' ? {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                            {type === "password" ? <Visisbility /> : <VisisbilityOff />}
                        </IconButton>
                    </InputAdornment>
                ),
            } : null}
        />
    </Grid>
  );


export default Input;