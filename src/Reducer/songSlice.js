import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";



const getSafely = (key) => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : undefined;
    } catch (error) {
        console.error(`Error parsing ${key} from localStorage:`, error);
        return [];
    }
};

const initialState = {
    songsData: getSafely("songsData") || [],
    userSongsData: [],
    searchData: [],
    albumData: getSafely("albumData") || {},
    currentSongsData: [],
    listenHistory: getSafely("listenHistory") || [],
    addedSongId: getSafely("addedSongId") || [],
    yourSongs: getSafely("yourSongs") || []
};


export const publishSong = createAsyncThunk("/song/publishSong",async(data)=>{
    console.log("came here for uploading the data")

    console.log(data)
    
    try{
        const res = axios.post("/api/v1/songs/",data);
        toast.promise(res,{
            loading:"wait publishing your song!",
            success:(data)=>{
                console.log(data)
                return data?.data?.message 
            }
        })

        await res;
        return res.data; 
    }

    catch(error){
        toast.error(error?.response?.data?.message)
    }
})


export const getSongs = createAsyncThunk("song/getSong", async (data) => {
    let result = {};
    console.log("came here for getting the songs ");
    try {
      const res = await axios.get(`/api/v1/songs/${data}`);
      result = res?.data?.data;
      return result;
    } catch (err) {
      console.error(err.response?.data?.message);
      throw err;
    }
  });


  
  export const searchSongs = createAsyncThunk("song/searchSong", async (data) => {
    let result = {};
    console.log("came here for getting the songs ");
    try {
      const res = await axios.get(`/api/v1/songs/${data}`);
      result = res?.data?.data;
      return result;
    } catch (err) {
      console.error(err.response?.data?.message);
      throw err;
    }
  });

  

  
  export const getArtistProfile = createAsyncThunk("song/artist", async (data) => {
    let result = {};
    try {
      const res = await axios.get(`/api/v1/users/a/${data}`);
      result = res?.data?.data;
      return result;
    } catch (error) {
      console.error(error?.response?.data?.message);
      throw error;
    }
  });
  


  export const addSongToListenHistory = createAsyncThunk("song/add",async(data)=>{
    let result =[]
        const res = axios.patch(`/api/v1/users/alh/${data}`)
        toast.promise(res,{
            loading:"wait adding the song to listen history",
            success:(data)=>{
                result = data?.data?.data ;
                return data?.data?.message ;
            }
        })

        await res;
        return result;
  })

  export const getListenHistory = createAsyncThunk("songs/history",async()=>{
    const res = axios.get('/api/v1/users/history');
    let result = []
    toast.promise(res,{
        loading:"wait fetching your history",
        success:(data)=>{
            result = data?.data?.data 
            return data?.data?.message 
        }
    })
    await res;
    return result;

  })


  export const getYourSongs = createAsyncThunk("songs/YourSongs",async()=>{
    let result = []
    const res = axios.get("api/v1/songs/ys");
    toast.promise(res,{
        loading:"wait getting your songs",
        success:(data)=>{
            console.log(data?.data?.data)
            result = data?.data?.data;
            return data?.data?.message 
        }
    })

    await res;
    return result;
  })

const songSlice = createSlice({
    name:"song",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(getSongs.fulfilled,(state,action)=>{
            state.songsData = action.payload;
            localStorage.setItem("songsData",JSON.stringify(state.songsData))
            console.log(state.songsData)
            state.currentSongsData =state.songsData
            state.searchData = []
        })

        .addCase(searchSongs.fulfilled,(state,action)=>{
            const searchedData = action.payload
            state.searchData = action.payload
            state.currentSongsData = searchedData
            state.currentSongsData = state.searchData
        })

        .addCase(addSongToListenHistory.fulfilled,(state,action)=>{
            state.addedSongId = action.payload.listenHistory
            localStorage.setItem("addedSongId",JSON.stringify(state.addedSongId))
        })

        .addCase(getArtistProfile.fulfilled,(state,action)=>{
            console.log(action.payload.fullName)
            console.log(action.payload)
           state.albumData = action.payload
           state.currentSongsData = state.albumData.songs
           console.log(state.currentSongsData)
           localStorage.setItem("albumData",JSON.stringify(action.payload))
           state.searchData=[]
        })


        
        .addCase(getListenHistory.fulfilled,(state,action)=>{
            state.listenHistory = []
           let  hist= []
            action.payload.map((item)=>{
                hist.push({owner:item.owner.fullName,thumbnail:item.thumbnail,songFile:item.songFile,title:item.title,_id:item._id})
            })

            for(let i=0;i<state.addedSongId.length;i++){
                for(let j=0;j<hist.length;j++){
                    if(state.addedSongId[i]==hist[j]._id){
                        state.listenHistory.push(hist[j])
                    }
                }
            }
            console.log(state.listenHistory)
            localStorage.setItem("listenHistory",JSON.stringify(state.listenHistory))    
        })

        .addCase(getYourSongs.fulfilled,(state,action)=>{
            state.yourSongs = action.payload
            localStorage.setItem("yourSongs",JSON.stringify(state.yourSongs))
            console.log(state.yourSongs)
        })

    }
})


export const {} = songSlice.actions;

export default songSlice.reducer;






