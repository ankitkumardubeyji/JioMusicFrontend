import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../Reducer/authSlice.js";
import songSliceReducer from "../Reducer/songSlice.js";
import followSliceReducer from "../Reducer/followSlice.js"
import playlistSliceReducer from "../Reducer/playlistSlice.js";

const store = configureStore({
    reducer:{
        auth:authSliceReducer,
        song:songSliceReducer,
        follow:followSliceReducer,
        playlist:playlistSliceReducer
    }
});


export default store;

