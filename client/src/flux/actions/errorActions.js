import { GET_ERRORS, CLEAR_ERRORS } from './types';


// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
  return dispatch => {
    dispatch({type: GET_ERRORS,  payload: { msg, status, id }})
  }
};

// CLEAR ERRORS
export const clearErrors = () => {
  return dispatch => {
    dispatch({type: CLEAR_ERRORS})
  }
};
