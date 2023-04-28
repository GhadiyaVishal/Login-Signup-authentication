import {
  CHANGE_PASSWORD,
  EDIT_USER_PROFILE,
  GET_ALL_USERS,
  LOGOUT_USER,
  LOG_IN,
  REGISTER,
} from "../../constants/constant";

const initialState = {
  users: [],
  logInUser: {},
  auth: null,
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: [...action.payload.userData],
        logInUser: { ...action.payload.logInUser },
        auth: action.payload.auth,
      };

    case REGISTER:
      return {
        ...state,
        users: [...action.payload.users],
        logInUser: { ...action.payload.currUser },
      };

    case LOG_IN:
      return {
        ...state,
        logInUser: { ...action.payload.logInUser },
        auth: action.payload.auth,
      };

    case EDIT_USER_PROFILE:
      return {
        ...state,
        users: [...action.payload.users],
        logInUser: { ...action.payload.currUser },
      };

    case CHANGE_PASSWORD:
      return {
        ...state,
        users: [...action.payload.users],
        logInUser: { ...action.payload.logInUser },
      };

    case LOGOUT_USER:
      return {
        ...state,
        logInUser: {},
        auth: false,
      };

    default:
      return state;
  }
};
