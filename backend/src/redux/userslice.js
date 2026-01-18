import { createSlice } from '@reduxjs/toolkit';
const initialState={
    currentUser:null,
    users:[],
    loading:false,
    error:null,
}


const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userStart:(start)=>{
        start.loading=true;
        start.error=null;

    },
    userSuccess:(state,action)=>{
      state.loading=false;
        state.currentUser=action.payload;
        state.error=null;
    },
    userFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
  },
})

export const {userStart, userSuccess, userFailure } = userSlice.actions
export default userSlice.reducer