import { configureStore } from "@reduxjs/toolkit";
import agentsReducer from "./features/agents/slice";
import requestReducer from "./features/requests/slice";

const store = configureStore({
  reducer: {
    agents: agentsReducer,
    request: requestReducer,
  },
});

export default store;
