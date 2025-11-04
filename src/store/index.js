import { configureStore } from "@reduxjs/toolkit";
import agentsReducer from "./features/agents/slice";
import requestReducer from "./features/requests/slice";
import authReducer from "./features/auth/slice";

const store = configureStore({
  reducer: {
    agents: agentsReducer,
    request: requestReducer,
    auth: authReducer,
  },
});

export default store;
