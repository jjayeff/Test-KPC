export const FETCH_USERS = 'KPC/FETCH_USER';
export const ADD_USER = 'KPC/ADD_USER';
export const ADD_USER_SUCCESS = 'KPC/ADD_USER_SUCCESS';
export const EDIT_USER = 'KPC/EDIT_USER';
export const EDIT_USER_SUCCESS = 'KPC/EDIT_USER_SUCCESS';
export const DELETE_USER = 'KPC/DELETE_USER';
export const DELETE_USER_SUCCESS = 'KPC/DELETE_USER_SUCCESS';

export const fetchUsers = () => dispatch => {
  const resopnse = JSON.parse(window.localStorage.getItem('Users'));
  dispatch({ type: FETCH_USERS, payload: resopnse });
};

export const addUser = data => dispatch => {
  dispatch({ type: ADD_USER });
  dispatch({ type: ADD_USER_SUCCESS, payload: data });
};

export const deleteUser = data => dispatch => {
  dispatch({ type: DELETE_USER });
  dispatch({ type: DELETE_USER_SUCCESS, payload: data });
};

export const editUser = data => dispatch => {
  dispatch({ type: EDIT_USER });
  dispatch({ type: EDIT_USER_SUCCESS, payload: data });
};

const initialState = {
  users: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: action.payload ? action.payload : []
      };
    case ADD_USER:
      return {
        ...state,
        users: null
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: action.payload
      };
    case DELETE_USER:
      return {
        ...state,
        users: null
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: action.payload
      };
    case EDIT_USER:
      return {
        ...state,
        users: null
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
};
