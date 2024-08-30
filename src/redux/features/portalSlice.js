import { createSlice } from "@reduxjs/toolkit";

const portalSlice = createSlice({
    name: "portal",
    initialState: {
        show: false,
        status:"add"
    },
    reducers: {
        setShowPortal: (state, action) => {
            state.show = action.payload
        },
        setStatus: (state, action) => { 
            state.status = action.payload
        }
    },
})

export default portalSlice.reducer
export const { setShowPortal, setStatus } = portalSlice.actions