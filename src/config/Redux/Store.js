import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Reducers/Reducer";

const myStore = createStore(rootReducer,applyMiddleware(thunk));

export default myStore;