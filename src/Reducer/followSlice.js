import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import toast from "react-hot-toast"
import songSlice from "./songSlice"
const initialState = {
    isFollowing:false,
    followingArtists:JSON.parse(localStorage.getItem("followingArtists"))||[],
}


export const toggleFollowingStatus = createAsyncThunk("follow/artist",async(data)=>{
    try{
        console.log("humhare .. yh") 
        const res = axios.post(`/api/v1/follower/toggle/${data}`)
        toast.promise(res,{
            loading:"wait toggling the follow status ",
            success:(data)=>{
                console.log(data);
                return data?.data?.message 
            }
        })
        await res;
        return res.data;
    }

    catch(error){
        console.log(error);
    }
   
})

export const artistsFollowing = createAsyncThunk("following/artist", async (data) => {
    try {
      const res = await axios.post('/api/v1/follower/fa');
      return res?.data?.data;
    } catch (error) {
      console.error(error?.response?.data?.message);
      throw error;
    }
  });


const followSlice = createSlice({
    name:"follow",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(toggleFollowingStatus.fulfilled,(state,action)=>{
          state.isFollowing = !state.isFollowing
        })

        .addCase(artistsFollowing.fulfilled,(state,action)=>{
            state.followingArtists = action.payload
            localStorage.setItem("followingArtists",JSON.stringify(action.payload))
        })
    }
})



export const {} = followSlice.actions;

export default followSlice.reducer;

