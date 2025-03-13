import { Api } from '../../APIs/Api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export function login(email, password) {
  return async function (dispatch) {
    try {
      dispatch({ type: LOGIN_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await Api.post(
        `/api/login/`,
        { email, password },
        config
      );

      dispatch({ type: LOGIN_SUCCESS, payload: data.access });
      sessionStorage.setItem("token", data.access);
      sessionStorage.setItem("isAuthenticated", true);

      
      return data;
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response?.data?.message || error.message });

      // Throw the error to be caught by the component
      throw error;
    }
  };
}