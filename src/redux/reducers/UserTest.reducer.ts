import { SET_STATE_ANSWERS } from "./actions";

export type QuizeState = {
    answers: Object;
}

const initialState: QuizeState = {
    answers: {}
};

const userTestReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_STATE_ANSWERS:
            return {
                ...state,
                answers: action.payload,
            };
        default:
            return state;
    }
}

const setStateAnswers = (answers: Object) => (
    { type: SET_STATE_ANSWERS, payload: answers }
)

export const setStateAnswersToState = (answers: Object) => (dispatch: any) => {
    dispatch(setStateAnswers(answers))
}

export default userTestReducer;