import { TypeLink } from "components/modules/Navigation/types";
import { SET_STATE_LINKS } from "./actions";

export type TypeInitialState = {
  links: TypeLink[];
}

let initialState: TypeInitialState = {
  links: [],
}

const menuReducer = (state = initialState, action ) => {
  switch(action.type) {
    case SET_STATE_LINKS:
      return {
          ...state,
          links: action.payload
      }
    default:
      return state;
  }
}

const setLinks = (links: TypeLink[]) => (
  { type: SET_STATE_LINKS, payload: links }
)

export const setLinksToState = (links: TypeLink[]) => (dispatch) => {
  dispatch(setLinks(links));
}

export default menuReducer;
