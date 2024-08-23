import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const deleteBudgetTransctions = createAsyncThunk('budget/delete', async (id) => {
    const { data } = await axios.delete(`http://localhost:5000/transactions/${id}`)
    return data
})

const deleteBudgetSlice = createSlice({
    name: "deleteBudget",
    initialState: {
        isLoading: false,
    },
    reducers: {
        deleteBudgetTransctions: (state = initialState, action) => {
            state.budget = action.payload;
            console.log(initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(deleteBudgetTransctions.pending, (state, { payload }) => {
            state.isLoading = true;
        })

        builder.addCase(deleteBudgetTransctions.fulfilled, (state, { payload }) => { 
            state.isLoading = false;
            console.log("fulfilled", payload)
        })

        builder.addCase(deleteBudgetTransctions.rejected, (state, { payload }) => { 
            state.isLoading = false;
        })
    }
})

export default deleteBudgetSlice.reducer