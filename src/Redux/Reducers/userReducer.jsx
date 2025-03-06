import {  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL } from '../Action/clientActions';

const initialState = {
  loading: false,
  user: null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload, error: null };
    case LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
