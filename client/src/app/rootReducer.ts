import { combineReducers } from "@reduxjs/toolkit";
import candidatesReducer from "../features/candidates/candidatesSlice";
import sessionReducer from "../features/session/sessionSlice";

export default combineReducers({
  candidates: candidatesReducer,
  session: sessionReducer,
});
