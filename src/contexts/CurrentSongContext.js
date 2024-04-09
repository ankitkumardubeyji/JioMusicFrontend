import {createContext,useContext} from "react";

// creating the context and passing the initial state and the functionalities to be performed to the context.
export const CurrentSongContext = createContext({
    currentSong:JSON.parse(localStorage.getItem("data"))||{id:0,title: "Warriyo - Mortals [NCS Release]", songFile: "songs/1.mp3", thumbnail: "covers/1.jpg",owner:"Jollu"},
    currentAlbumSong:{id:0,songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg",singer:"Jollu"},
    play:false,
    audioElement:new Audio('songs/1.mp3'),
    updateSong:(song)=>{},
    updateCurrentAlbumSong:(song)=>{},
    musicControl :(song)=>{},
})



export const CurrentSongProvider = CurrentSongContext.Provider;

export default function useCurrentSong(){
    return useContext(CurrentSongContext) // wrapping the context inside the useContext and returning 
}


