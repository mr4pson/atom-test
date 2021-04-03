import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./reducers/Auth.reducer";
import adminPagesReducer from "./reducers/AdminPages.reducer";
import userTestReducer from "./reducers/UserTest.reducer";

let reducers = combineReducers({
    userTest: userTestReducer,
    auth: authReducer,
    adminPages: adminPagesReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
