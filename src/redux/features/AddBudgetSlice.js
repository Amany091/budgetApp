import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  budget: {
    title: "",
    amount: "",
    category: "",
    type: "",
    date: "",
  },
  isLoading: false,
};

export const addBudgetTransctions = createAsyncThunk(
  "addBudget/budget",
  async (payload) => {
    const { data } = await axios.post(
      "http://localhost:5000/transactions",
      payload
    );
    if (!data) throw new Error("failed");
    console.log(data);
    return data;
  }
);

const AddBudgetSlice = createSlice({
  name: "newBudget",
  initialState,
  reducers: {
    addBudgetTransctions: (state = initialState, action) => {
      state.budget = action.payload;
      console.log(initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addBudgetTransctions.pending, (state, { payload }) => {
      state.isLoading = true;
      console.log("pending", payload);
    });
    builder.addCase(addBudgetTransctions.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      console.log("fulfilled", payload);
    });
    builder.addCase(addBudgetTransctions.rejected, (state, { payload }) => {
      state.isLoading = false;

      console.log("rejected", payload);
    });
  },
});

export const addBudgetFunction = AddBudgetSlice.actions;
export default AddBudgetSlice.reducer;
