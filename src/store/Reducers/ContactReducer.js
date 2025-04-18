import {
  RESET_CONTACTS,
  RESET_SPECIFIC_CONTACTS,
  SET_CONTACTS,
  SET_SPECIFIC_CONTACTS,

} from "../Types/ContactTypes";

const initialState = {
  CONTACTS: [],
  specificCONTACTS: null,
};

const ContactReducer = (state = initialState, action) => {
  if (action.type === SET_CONTACTS) {
    return { ...state, CONTACTS: action.payLoad };
  } else if (action.type === RESET_CONTACTS) {
    return { ...state, CONTACTS: [] };
  } else if (action.type === SET_SPECIFIC_CONTACTS) {
    return { ...state, specificCONTACTS: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_CONTACTS) {
    return { ...state, specificCONTACTS: null };
  } else {
    return state;
  }
};

export default ContactReducer;
