import { newsCreationMode } from "components/pages/AdminPage/NewsPage/types";
import { 
  SET_STATE_CREATION_MODE_CREATE, 
  SET_STATE_CREATION_MODE_EDIT,
  SET_STATE_CURRENT_ID 
} from "./actions";

export type TypeInitialState = {
  currentId: string | null;
  creationMode: newsCreationMode | undefined;
}

let initialState: TypeInitialState = {
  currentId: '',
  creationMode: undefined,
}

const newsReducer = (state = initialState, action ) => {
  switch(action.type) {
    case SET_STATE_CURRENT_ID:
      return {
          ...state,
          currentId: action.payload
      }
    case SET_STATE_CREATION_MODE_EDIT:
      return {
        ...state,
        creationMode: newsCreationMode.EDIT
      }
    case SET_STATE_CREATION_MODE_CREATE:
      return {
        ...state,
        creationMode: newsCreationMode.CREATE
      }
    default:
      return state;
  }
}

const setCurrentId = (id: string) => (
  { type: SET_STATE_CURRENT_ID, payload: id }
)

const setCreationModeEdit = () => (
  { type: SET_STATE_CREATION_MODE_EDIT }
)

const setCreationModeCreate = () => (
  { type: SET_STATE_CREATION_MODE_CREATE }
)

export const setCreationModeEditToState = () => (dispatch) => {
  dispatch(setCreationModeEdit());
}

export const setCreationModeCreateToState = () => (dispatch) => {
  dispatch(setCreationModeCreate());
}

export const setCurrentIdToState = (id: string) => (dispatch) => {
  dispatch(setCurrentId(id));
}

export default newsReducer;