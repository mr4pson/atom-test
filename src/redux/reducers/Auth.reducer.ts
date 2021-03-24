import { JwtPair } from "components/pages/LoginPage/types";
import { SET_JWT_PAIR } from "./actions"

let initialState = {
  jwtPair: JSON.parse(localStorage.getItem('jwtPair')!),
}

const authReducer = (state = initialState, action ) => {
  switch(action.type) {
    case SET_JWT_PAIR:
      return {
          ...state,
          jwtPair: action.payload
      }
    default:
      return state;
  }
}

const setJwtPair = (jwtPair: JwtPair | null) => (
  { type: SET_JWT_PAIR, payload: jwtPair }
)

export const setJwtPairToState = (jwtPair: JwtPair | null) => (dispatch) => {
  dispatch(setJwtPair(jwtPair));
}

export default authReducer;