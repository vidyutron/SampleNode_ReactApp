import axios from "axios";
import setAuthToken from "../util/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import { decode } from "punycode";

//Register
//wait for the response and then dispatch
export const registerUser = (userData, history) => dispatch => {
  //must have a type and we will import the type from the ./types
  axios
    .post("/api/users/register", userData)
    //inorder to redirect from the action without any router support
    //
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //save to local storage
      const { token } = res.data;
      //set token to local storage
      localStorage.setItem("jwtToken", token);
      //set it to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//log user out
export const logoutUser = () => dispatch => {
  //Remove token from the localstorage
  localStorage.removeItem("jwtToken");
  //Remove the auth header for future requests
  setAuthToken(false);

  //Set current user to empty object which will also set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
