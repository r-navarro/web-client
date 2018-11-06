import history from '../History'

export const SHOW_ERROR = 'SHOW_ERROR'
export const GET_MEAL = 'GET_MEAL'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const HAS_ERRORED = 'HAS_ERRORED'
export const IS_LOADING = 'IS_LOADING'
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'


export const showError = (error) => {
  return {
    type: SHOW_ERROR,
    error,
  }
}

export const getMeals = (meals) => {
  return {
    type: GET_MEAL,
    meals,
  }
}

export const login = () => {
  return {
    type: LOGIN,
  }
}

export const logout = () => {
  return {
    type: LOGOUT,
  }
}

export const loginError = () => {
  return {
    type: LOGIN_ERROR,
  }
}

export function hasErrored(bool) {
  return {
    type: HAS_ERRORED,
    hasErrored: bool
  };
}

export function isLoading(bool) {
  return {
    type: IS_LOADING,
    isLoading: bool
  };
}

export function fetchDataSuccess(varName, data) {
  return {
    type: FETCH_DATA_SUCCESS,
    data,
    varName,
  };
}

export const getHeaders = () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const token = localStorage.getItem('token');
  headers.append('X-Auth-Token', token);
  return headers;
}

export const baseUrl = 'http://localhost:8080/';
// export const baseUrl = 'https://rnavarro.net/api/';

export function fetchData(varName, url, method, body) {
  return (dispatch) => {
    dispatch(isLoading(true));

    fetch(baseUrl + url, {
      method: method,
      headers: getHeaders(),
      body: JSON.stringify(body),
      credentials: 'include'
    })
      .then((response) => {
        if (response.status === 403) {
          history.push('/logout');
        } else if (response.status === 400) {
          response.json().then(json => {
            dispatch(hasErrored(true));
            dispatch(showError(json.message));
            dispatch(isLoading(false));
          });
        } else if (!response.ok) {
          throw Error(response);
        } else {
          dispatch(isLoading(false));
          response.json().then(json => dispatch(fetchDataSuccess(varName, json)));
        }
      })
      .catch((ex) => {
        dispatch(hasErrored(true));
        dispatch(showError(ex.message));
      });
  };
}

export function fetchHeader(url, method, body) {
  return (dispatch) => {
    dispatch(isLoading(true));

    return fetch(baseUrl + url, {
      method: method,
      headers: getHeaders(),
      body: JSON.stringify(body),
      credentials: 'include',
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      dispatch(isLoading(false));
      return response;
    }).catch((ex) => {
      dispatch(hasErrored(true));
      dispatch(showError(ex));
    });
  };
}
