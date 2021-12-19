import { TYPE } from "../action/authAction";
const initialState = {};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE.AUTH:
      return action.payload;

    default:
      return state;
  }
};

export default authReducer;
