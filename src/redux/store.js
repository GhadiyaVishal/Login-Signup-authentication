import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
// import { RootReducer } from "./reducers/rootReducer";
import { userReducers } from "./reducers/UserReducer";

export const store = createStore(userReducers,composeWithDevTools());
