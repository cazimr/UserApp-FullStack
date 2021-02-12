import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
import logger from "redux-logger";

//export redux store
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)));


//export all of the actions
export * from './user/userActions'