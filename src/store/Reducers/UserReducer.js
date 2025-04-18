import {
  RESET_SPECIFIC_USERS,
  RESET_USERS,
  SET_SPECIFIC_USERS,
  SET_USERS,
} from "../Types/UserTypes";

const initialState = {
  allUsers: [],
  specificUser: null,
};

const UserReducer = (state = initialState, action) => {
  if (action.type === SET_USERS) {
    return { ...state, allUsers: action.payLoad };
  } else if (action.type === RESET_USERS) {
    return { ...state, allUsers: [] };
  } else if (action.type === SET_SPECIFIC_USERS) {
    return { ...state, specificUser: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_USERS) {
    return { ...state, specificUser: null };
  } else {
    return state;
  }
};

export default UserReducer;
