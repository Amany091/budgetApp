import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const editBudgetTransctions = createAsyncThunk('editBudget/edit', async (id, newBudget) => { 
    const { data } = await axios.put(`http://localhost:5000/transactions/${id}`, newBudget)
    return data
})

const EditBudgetSlice = createSlice({
    name: "editBudget",
    initialState: {
        budget: {
            title: "",
            amount: "",
            category: "",
            type: "",
            date: "",
        },
        isLoading: false,
    },
    reducers: {
        editBudgetTransctions: (state, { payload }) => {
            state.budget = payload
        }
    },
    extraReducers: (builder) => { 
        builder.addCase(editBudgetTransctions.pending, (state, { payload }) => { 
            state.isLoading = true;
        })

        builder.addCase(editBudgetTransctions.fulfilled, (state, { payload }) => { 
            console.log("fulfilled", payload)
            state.isLoading = false;
        })

        builder.addCase(editBudgetTransctions.rejected, (state, { payload }) => { 
            state.isLoading = false;
        })
    }
})

export default EditBudgetSlice