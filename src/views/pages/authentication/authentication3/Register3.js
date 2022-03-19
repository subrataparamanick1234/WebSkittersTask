/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable arrow-body-style */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Box, Button, FormControl, IconButton, InputAdornment } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Field, reduxForm } from 'redux-form';
import * as Export from 'ui-component/formComponent/export';
// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';

import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { UserSignUp } from 'store/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

// assets

// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const history = useNavigate();
    const { form } = useSelector((store) => store);
    const formObj = form.Register.values;
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const steps = ['Enter your name', 'Enter your address', 'Done!'];
    const [activeStep, setActiveStep] = React.useState(0);
    const [showPassword, setShowPassword] = useState(false);

    const [strength, setStrength] = useState(0);
    const [level, setLevel] = useState();

    const formSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(UserSignUp(formObj, history));
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicator(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (
                    <>
                        <Box>
                            <form>
                                <Grid container spacing={matchDownSM ? 0 : 2}>
                                    <Grid item xs={12} sm={6}>
                                        <Field component={Export.RenderTextField} name="fName" label="First Name" />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Field component={Export.RenderTextField} name="lName" label="Last Name" />
                                    </Grid>
                                </Grid>
                                <Field component={Export.RenderTextField} name="phone" label="Enter your phone number" type="number" />
                                <Field component={Export.RenderTextField} name="email" label="Email Address / Username" type="email" />
                                <Field
                                    component={Export.RenderTextField}
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="large"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    onChangePass={(e) => {
                                        changePassword(e.target.value);
                                    }}
                                />

                                {strength !== 0 && (
                                    <FormControl fullWidth>
                                        <Box sx={{ mb: 2 }}>
                                            <Grid container spacing={2} alignItems="center">
                                                <Grid item>
                                                    <Box
                                                        style={{ backgroundColor: level?.color }}
                                                        sx={{ width: 85, height: 8, borderRadius: '7px' }}
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1" fontSize="0.75rem">
                                                        {level?.label}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </FormControl>
                                )}

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <>
                                        <Button
                                            disableElevation
                                            fullWidth
                                            size="large"
                                            type="submit"
                                            variant="contained"
                                            onClick={handleNext}
                                            color="secondary"
                                            sx={{ mt: 3, ml: 1 }}
                                        >
                                            Next
                                        </Button>
                                    </>
                                </Box>
                            </form>
                        </Box>
                    </>
                );
            case 1:
                return (
                    <>
                        <form>
                            <Field component={Export.RenderTextField} name="city" label="Enter your City" type="text" />
                            <Field component={Export.RenderTextField} name="state" label="Enter your State" type="text" />
                            <Field component={Export.RenderTextField} name="zip" label="Enter your Zip" type="text" />

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <>
                                    <Button
                                        disableElevation
                                        fullWidth
                                        size="large"
                                        type="button"
                                        variant="contained"
                                        onClick={handleBack}
                                        color="secondary"
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Back
                                    </Button>

                                    <Button
                                        disableElevation
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        onClick={handleNext}
                                        color="secondary"
                                        sx={{ mt: 3, ml: 1 }}
                                    >
                                        Next
                                    </Button>
                                </>
                            </Box>
                        </form>
                    </>
                );
            case 2:
                return (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <>
                                <Button
                                    disableElevation
                                    fullWidth
                                    size="large"
                                    type="button"
                                    variant="contained"
                                    onClick={() => window.location.reload()}
                                    color="error"
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disableElevation
                                    fullWidth
                                    size="large"
                                    type="button"
                                    variant="contained"
                                    onClick={formSubmitHandler}
                                    color="secondary"
                                    sx={{ mt: 3, ml: 1 }}
                                >
                                    Sign up now
                                </Button>
                            </>
                        </Box>
                    </>
                );
            default:
                throw new Error('Unknown step');
        }
    }

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#">
                                            <Logo />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        color={theme.palette.secondary.main}
                                                        gutterBottom
                                                        variant={matchDownSM ? 'h3' : 'h2'}
                                                    >
                                                        Sign up
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="16px"
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        Enter your credentials to continue
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                                            {steps.map((label) => (
                                                <Step key={label}>
                                                    <StepLabel>{label}</StepLabel>
                                                </Step>
                                            ))}
                                        </Stepper>
                                        {activeStep === steps.length ? (
                                            <>
                                                <Typography variant="h5" gutterBottom>
                                                    Thank you for your order.
                                                </Typography>
                                                <Typography variant="subtitle1">
                                                    Your order number is #2001539. We have emailed your order confirmation, and will send
                                                    you an update when your order has shipped.
                                                </Typography>
                                            </>
                                        ) : (
                                            <>{getStepContent(activeStep)}</>
                                        )}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography component={Link} to="/" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                                                Already have an account?
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};
const validate = (values) => {
    const err = {};
    const requiredFields = ['fName', 'lName', 'email', 'phone', 'password'];
    requiredFields.forEach((requiredField) => {
        if (!values[requiredField]) {
            err[requiredField] = 'required';
        }
    });

    return err;
};
export default reduxForm({
    form: 'Register',
    validate,
    enableReinitialize: true
})(Register);
