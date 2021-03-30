import { SET_STATE_CURRENT_ID } from "./actions";

export type TypeInitialState = {
  currentId: string | null;
}

let initialState: TypeInitialState = {
  currentId: '',
}

const newsReducer = (state = initialState, action ) => {
  switch(action.type) {
    case SET_STATE_CURRENT_ID:
      return {
          ...state,
          currentId: action.payload
      }
    default:
      return state;
  }
}

const setCurrentId = (id: string) => (
  { type: SET_STATE_CURRENT_ID, payload: id }
)

export const setCurrentIdToState = (id: string) => (dispatch) => {
  dispatch(setCurrentId(id));
}

export default newsReducer;
