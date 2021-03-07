import { SET_STATE_ANSWERS, SET_STATE_IS_TIMER_FINISHED } from "./actions";

export type UserTestState = {
    answers: Object;
    isTimerFinished: boolean;
}

const initialState: UserTestState = {
    answers: {},
    isTimerFinished: false
};

const userTestReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_STATE_ANSWERS:
            return {
                ...state,
                answers: action.payload,
            };
        case SET_STATE_IS_TIMER_FINISHED:
            return {
                ...state,
                isTimerFinished: action.payload,
            };
        default:
            return state;
    }
}

const setStateAnswers = (answers: Object) => (
    { type: SET_STATE_ANSWERS, payload: answers }
)

const setStateIsTestFinished = (isTimerFinished: boolean) => (
    { type: SET_STATE_IS_TIMER_FINISHED, payload: isTimerFinished }
)

export const setStateAnswersToState = (answers: Object) => (dispatch: any) => {
    dispatch(setStateAnswers(answers));
}

export const setStateIsTimerFinishedToState = (isTimerFinished: boolean) => (dispatch: any) => {
    console.log(isTimerFinished);
    dispatch(setStateIsTestFinished(isTimerFinished));
}

export default userTestReducer;