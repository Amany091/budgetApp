import { configureStore } from "@reduxjs/toolkit";

import transactionsApiReducer from "./features/transactionsApiSlice";
import portalReducer from "./features/portalSlice";

const store = configureStore({
  reducer: {
    transactions: transactionsApiReducer,
    portal: portalReducer,
  },
});

export default store;
