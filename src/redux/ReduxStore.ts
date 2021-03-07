import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import userTestReducer from "./reducers/UserTest.reducer";

const reducers = combineReducers({
    userTest: userTestReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;