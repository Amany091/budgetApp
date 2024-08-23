import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "./features/AddBudgetSlice";
import deleteReducer from "./features/deleteBudgetSlice";
import editReducer from "./features/EditBudgetSlice";

const store = configureStore({
    reducer: {
        budget: budgetReducer,
        deleteBudget: deleteReducer,
        editBudget: editReducer
  },
});

export default store;
