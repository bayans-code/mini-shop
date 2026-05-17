import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async (userData, {rejectWithValue})=>{
    const {email,password} = userData
    try{
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/login`,
         {email,password}
      );
      const user = response.data.user
      const message = response.data.message
      return {user,message}
    }
    catch(error){
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name:"auth",
  initialState:{
    userId:null,
    userName:null,
    role:null,
    isLoading:false,
    error:null
  },
  reducers:{
    logout(state){
      state.user = null;
      state.role = null;
    }
  },
  extraReducers:(builder)=>{
    builder
      .addCase(login.pending,(state)=>{
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.userId= action.payload.user._id;
        state.userName = action.payload.user.userName;
        state.role = action.payload.user.role;
      })
      .addCase(login.rejected,(state,action)=>{
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;