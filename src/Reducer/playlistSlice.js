import { ContactPageSharp, TonalitySharp } from "@mui/icons-material"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { data } from "autoprefixer"

import axios from "axios"
import toast from "react-hot-toast"
let userPlaylists;
try {
    const userPlaylistsString = localStorage.getItem("userPlaylists");
    userPlaylists = userPlaylistsString ? JSON.parse(userPlaylistsString) : [];
} catch (error) {
    console.error("Error parsing user playlists from localStorage:", error);
    userPlaylists = [];
}

let songsInPlaylist;
try {
    const songsInPlaylistString = localStorage.getItem("songsInPlaylist");
    songsInPlaylist = songsInPlaylistString ? JSON.parse(songsInPlaylistString) : [];
} catch (error) {
    console.error("Error parsing songs in playlist from localStorage:", error);
    songsInPlaylist = [];
}

const initialState = {
    userPlaylists: userPlaylists,
    songsInPlaylist: songsInPlaylist
};


export const createPlaylist = createAsyncThunk("create/playlist",async(data)=>{
try{
    console.log(data)
    const res = axios.post("/api/v1/playlist/",data)
    toast.promise(res,{
        loading:"wait creating your playlist",
        success:(data)=>{
            console.log(data)
            return data?.data?.message 
        }
        
    })

    await res;
    return res.data 
}
catch(err){
    console.log(err)
    toast.error.response.message = err 
}
   
})


export const addSongToPlaylist = createAsyncThunk("song/playlist",async(data)=>{
    console.log(data)
    const res = axios.patch(`/api/v1/playlist/add/${data}`)

    toast.promise(res,{
        loading:"wait loading your data",
        success:(data)=>{
            console.log(data)
            return data?.data?.message 
        }
    })

    await res;
    return res.data 
})


export const getSongsInPlaylist = createAsyncThunk("songs/playlist",async(data)=>{
    let result = []
    console.log("came here for getting the songs ")
    const res = axios.get(`/api/v1/playlist/get/${data}`)
    toast.promise(res,{
        loading:"wait loading songs from your playlist",
        success:(data)=>{
            console.log(data?.data?.data)
            result.push({name:data?.data?.data[0].name})
            result.push(data?.data?.data[0].result)
            return data?.data?.message 
        }
    })

    
    await res;
    return result
})


export const getUserPlaylist = createAsyncThunk("getUser/playlist",async()=>{
    const res = axios.get("/api/v1/playlist/user/p/get")
    let result = []
    toast.promise(res,{
        loading:"wait loading your playlists",
        success:(data)=>{
            result = data?.data?.data
            return data?.data?.message 
        }
    })

    await res;
    return result;
})


const playlistSlice = createSlice({
    name:"playlist",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getUserPlaylist.fulfilled,(state,action)=>{
            state.userPlaylists = action.payload
            console.log(state.userPlaylists);
            localStorage.setItem("userPlaylists",JSON.stringify(state.userPlaylists))
        })

        .addCase(getSongsInPlaylist.fulfilled,(state,action)=>{
            state.songsInPlaylist = action.payload
            localStorage.setItem("songsInPlaylist",JSON.stringify(action.payload))
            console.log(state.songsInPlaylist)
        })
    }

})


export const {} = playlistSlice.actions
export default playlistSlice.reducer

