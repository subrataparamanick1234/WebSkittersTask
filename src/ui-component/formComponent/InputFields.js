/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
// import React from 'react';
import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const RenderTextField = ({ type, label, input, endAdornment, onChangePass, meta: { touched, error }, ...custom }) => {
    const theme = useTheme();

    return (
        <>
            <FormControl
                fullWidth
                error={Boolean(touched && error)}
                sx={{ ...theme.typography.customInput }}
                helperText={touched && error}
                {...input}
                {...custom}
            >
                <InputLabel htmlFor="outlined-adornment-email-register">{label}</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-email-register"
                    type={type}
                    inputProps={{}}
                    endAdornment={endAdornment}
                    onChange={onChangePass}
                />
                {touched && error && (
                    <FormHelperText error id="standard-weight-helper-text--register">
                        {`${label} is ${error}`}
                    </FormHelperText>
                )}
            </FormControl>
        </>
    );
};
