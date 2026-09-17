import { createSlice } from "@reduxjs/toolkit";


const habitSlice = createSlice({
    name:"habits",
    initialState:{
        habits:[],
    },
    reducers:{
        setHabits:(state,action)=>{
            state.habits = action.payload;
        },
    },
});

export const {setHabits} = habitSlice.actions;
export default habitSlice.reducer;