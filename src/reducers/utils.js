import { TOGGLE_DARKMODE } from "../actions/types";
import { DC_DARKMODE } from "../utils/constants";

const initialState = {
  darkmode: localStorage.getItem(DC_DARKMODE),
};

const darkReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_DARKMODE:
      return {
        ...state,
        loading: false,
        darkmode: payload,
      };
    default:
      return state;
  }
};

export default darkReducer;
