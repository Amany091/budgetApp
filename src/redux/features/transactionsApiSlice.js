import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTransactions } from "../../api/transactions/transactionsApi";
import { clientApi } from "../../api/clientApi";

const state = {
  isLoading: false,
  transactions: [],
  categories: [],
  error: null,
  filteredData: [],
  sortData: "",
  categoryFilter: "",
  typeFilter: "all", // expanse , income
  editBud : {}
};

export const fetchTransactions = createAsyncThunk(
  "transactionsApi/transactions",
  async () => {
    const { transactions, categories } = await getAllTransactions();
    return { transactions, categories };
  }
);

export const deleteTransaction = createAsyncThunk("deleteTransactions/delete", async (id) => {
  const response = await clientApi.delete(`/transactions/${id}`)
  return response.data
})

export const addTransaction = createAsyncThunk("addTransaction/add", async (data) => {
  const response = await clientApi.post("/transactions", data)
  return response.data
})

export const editTransaction = createAsyncThunk("editTransaction", async (data, id) => {
  console.log(data, data.id)
  const response = await clientApi.put(`/transactions/${data.id}`, data)
  return response.data
})

const transactionsApiSlice = createSlice({
  name: "transactionsApi",
  initialState: state,
  reducers: {
    setSortData: (state, action) => {
      state.sortData = action.payload;
      state.filteredData = [...state.filteredData].sort((a, b) => {
        if (state.sortData === "date") {
          const aTimeStamp = new Date(a.date);
          const bTimeStamp = new Date(b.date);
          if (aTimeStamp > bTimeStamp) return -1;
        }
        if (state.sortData === "amount") {
          if (Number(a.amount) > Number(b.amount)) return -1;
        }
        return 1;
      });
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
      state.filteredData = state.transactions.filter((transaction) => {
        if (state.categoryFilter !== "") {
          return transaction.category === state.categoryFilter;
        } else {
          return true;
        }
      });
      
    },
    setTypeFilter: (state, action) => {
      state.typeFilter = action.payload;
      if (state.typeFilter !== "all") {
        state.filteredData = state.transactions.filter(
          (transaction) => transaction.type === state.typeFilter
        );
      } else if (state.typeFilter === "all") {
        state.filteredData = [...state.transactions];
      }
    },
    setEditBud: (state, action) => { 
      state.editBud = action.payload
    }
  },

  extraReducers: (builder) => {
    // handle fetching data promise
    builder.addCase(fetchTransactions.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.isLoading = false;
      state.transactions = action.payload.transactions;
      state.filteredData = action.payload.transactions;
      state.categories = action.payload.categories;
      state.error = null;
    });
    builder.addCase(fetchTransactions.rejected, (state, action) => {
      console.log("rejected", action.payload);
      state.isLoading = false;
      state.categories = [];
      state.transactions = [];
      state.error = action.error.message;
    });
    // handle delete promise response
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      state.transactions = state.transactions.filter((transaction) => transaction.id !== action.meta.arg);
      state.filteredData = state.filteredData.filter((transaction)=> transaction.id !== action.meta.arg)
    })
    // handle add promise response
    builder.addCase(addTransaction.fulfilled, (state, action) => {
      state.transactions.push(action.payload)
      state.filteredData.push(action.payload)
    })
    // handle edit promise response
    builder.addCase(editTransaction.fulfilled, (state, action) => { 
      const transactionIndex = state.transactions.findIndex((transaction)=> transaction.id === action.payload.id)
      if (transactionIndex !== -1) {
        state.transactions[transactionIndex] = action.payload
        state.filteredData[transactionIndex] = action.payload
      }
    })
    builder.addCase(editTransaction.rejected, (state, action) => {
      console.log("rejected", action.error.message);
    })
  },
});

export const { setSortData, setCategoryFilter, setTypeFilter,setEditBud } = transactionsApiSlice.actions;
export default transactionsApiSlice.reducer;
