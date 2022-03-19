/* eslint-disable prettier/prettier */
/* eslint-disable arrow-body-style */
import { Firebase, db } from 'database';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';

export const userLoginHelper = (data) => {
    return {
        type: 'SET_USER_AUTH',
        payload: data
    };
};
const userLogoutHelper = (data) => {
    return {
        type: 'DELETE_USERS_DATA',
        payload: data
    };
};
export const UserSignUp = (formObj, history) => {
    return async () => {
        try {
            console.log(Firebase);
            if (formObj.email === '' && formObj.password === '') {
                toast.error(`Enter details to signup!`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                Firebase.auth()
                    .createUserWithEmailAndPassword(formObj.email, formObj.password)
                    .then(async (res) => {
                        res.user.updateProfile({
                            displayName: `${formObj.fName} ${formObj.lName}`,
                            phoneNumber: formObj.phone
                        });
                        await db.ref('Users').push({
                            fName: formObj.fName,
                            lName: formObj.lName,
                            email: formObj.email,
                            city: formObj.city,
                            state: formObj.state,
                            zip: formObj.zip,
                            password: formObj.password,
                            uid: res.user.uid
                        });
                        history('/');
                        toast.success(`User registered successfully!`, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        if (errorCode === 'auth/weak-password') {
                            toast.error(`The password is too weak.`, {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        } else {
                            toast.error(errorMessage, {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        }
                        console.log(error);
                    });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const userLogin = (loginCredentials, history) => {
    return async (dispatch) => {
        try {
            if (loginCredentials.email === '' && loginCredentials.password === '') {
                toast.error(`Enter details to signin!`, {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {
                Firebase.auth()
                    .signInWithEmailAndPassword(loginCredentials.email, loginCredentials.password)
                    .then(async (res) => {
                        // console.log(res);
                        // console.log('User logged-in successfully!');

                        const jwtToken = await res.user?.getIdToken();
                        // console.log('🚀 ~ file: userAction.js ~ line 106 ~ .then ~ jwtToken', jwtToken);

                        localStorage.setItem('userJwtToken', jwtToken);
                        const decode = jwtDecode(jwtToken);
                        dispatch(userLoginHelper(decode));
                        history('/dashboard');
                        toast.success(`User logged-in successfully!`, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        if (errorCode === 'auth/weak-password') {
                            toast.error(`The password is too weak.`, {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        } else {
                            toast.error(errorMessage, {
                                position: toast.POSITION.TOP_RIGHT
                            });
                        }
                        console.log(error);
                    });
            }
        } catch (err) {
            if (err.response) {
                const message = { message: err.response.data.message };
                dispatch({
                    type: 'SET_LOGIN_ERRORS',
                    payload: message
                });
            } else {
                const message = { message: err };
                console.log(message);
                dispatch({
                    type: 'SET_LOGIN_ERRORS',
                    payload: message
                });
            }
        }
    };
};

export const userLogout = () => {
    return (dispatch) => {
        Firebase.auth()
            .signOut()
            .then(() => {
                window.location.href = '/';
                localStorage.removeItem('userJwtToken');
                dispatch(userLogoutHelper({}));
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
