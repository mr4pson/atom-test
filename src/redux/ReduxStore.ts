import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./reducers/Auth.reducer";
import newsReducer from "./reducers/News.reducer";
import partnersReducer from "./reducers/Partners.reducer";
import userTestReducer from "./reducers/UserTest.reducer";

let reducers = combineReducers({
    userTest: userTestReducer,
    auth: authReducer,
    news: newsReducer,
    partners: partnersReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
