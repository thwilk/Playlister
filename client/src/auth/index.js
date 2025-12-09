import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import authRequestSender from './requests'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    EDIT_USER: "EDIT_USER",
    CONTINUE_GUEST: "CONTINUE_GUEST"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMessage: null,
        isguest: false
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: null,
                    isguest: false
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: payload.errorMessage,
                    isguest: false
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: null,
                    isguest: false
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: payload.errorMessage,
                    isguest: false
                })
            }
            case AuthActionType.EDIT_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: payload.errorMessage,
                    isguest: false
                });
            }
            case AuthActionType.CONTINUE_GUEST: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: payload.errorMessage,
                    isguest: true
                });
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await authRequestSender.getLoggedIn();
        if (response) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.loggedIn,
                    user: response.user
                }
            });
        }
    }

    auth.continueAsGuest = async function() {
        authReducer({
            type: AuthActionType.CONTINUE_GUEST,
            payload: {
                user: null,
                loggedIn: false,
                errorMessage: null,
                isguest: true
            }
        })
    }

    
    auth.registerUser = async function(userName, email, profileAvatar, password, passwordVerify) {
        console.log("REGISTERING USER");
        try{   
            const response = await authRequestSender.registerUser(userName, email, profileAvatar, password, passwordVerify);   
            if (response) {
                console.log("Registered Sucessfully");
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.user,
                        loggedIn: true,
                        errorMessage: null
                    }
                })
                history.push("/login");
                console.log("NOW WE LOGIN");
                auth.loginUser(email, password);
                console.log("LOGGED IN");
            }
        } catch(error){
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: auth.user,
                    loggedIn: false,
                    errorMessage: null
                }
            })
        }
    }

    auth.loginUser = async function(email, password) {
        try{
            const response = await authRequestSender.loginUser(email, password);

            if (response.success) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.user,
                        loggedIn: true,
                        errorMessage: null
                    }
                })
                history.push("/");
            }
        } catch(error){
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: auth.user,
                    loggedIn: false,
                    errorMessage: null
                }
            })
        }
    }

    auth.logoutUser = async function() {
        const response = await authRequestSender.logoutUser();
        if (response == 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.getUserAvatar = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.profileAvatar;
        }
        console.log("user initials: " + initials);
        return initials;
    }

    auth.editUser = async function(userName, profilePicture, newPassword) {
       try {
        const response = await authRequestSender.editUser(userName, profilePicture, newPassword);
        if (response == 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: {
                    user: response.user,
                    loggedIn: true,
                    errorMessage: null
                }
            });

            history.push("/");
        }

    } catch(error){
        authReducer({
            type: AuthActionType.EDIT_USER,
            payload: {
                user: auth.user,
                loggedIn: false,
                errorMessage: error.errorMessage
            }
        })
    }
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };