/* DOUBT TO BE RESOLVED
1. HOW TO ADD EVENT LISTENERS ON THE REACT ELEMENTS OTHER THAN onClick
2. HOW TO PROPOGATE THE EVENT FROM PARENT TO CHILD VIA ONCLICK IN REACT

*/


import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Home from "./componets/Home"
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom'
import Music from './componets/SongAlbum'
import {Route} from "react-router-dom"
import Layout from "./Layout"
import SongAlbum from './componets/SongAlbum'
import { CurrentSongProvider } from './contexts/CurrentSongContext'
import Login from './componets/Login/Login'
import History from './componets/History'
import Register from './componets/Register/Register'
import UploadSong from './componets/UploadSong'
import { useDispatch, useSelector } from 'react-redux'
import { addSongToListenHistory, getSongs } from './Reducer/songSlice'
import Search from './componets/Search'
import YourSongs from './componets/YourSongs'
import CreatePlaylist from './componets/CreatePlaylist'
import Playlist from './componets/Playlist'
function App() {

  const dispatch = useDispatch()
  

  const [currentSong,setCurrentSong] = useState(JSON.parse(localStorage.getItem("data"))||{id:0,title: "Warriyo - Mortals [NCS Release]", songFile: "songs/1.mp3", thumbnail: "covers/1.jpg",owner:"Jollu"});
  const [play,setPlay] = useState(false)
  const [audioElement,setAudioElement] = useState(new Audio('songs/1.mp3'))
  const [currentAlbumSong,setCurrentAlbumSong] = useState({songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg",singer:"Jollu"})

  const updateSong = (song,index)=> {
    console.log("came here for updating the song")
    console.log(song)
    setCurrentSong({id:index,owner:song.owner,thumbnail:song.thumbnail,songFile:song.songFile,title:song.title})
    dispatch(addSongToListenHistory(song._id))
    localStorage.setItem("currentSong",JSON.stringify({id:index,...song}))
  }

  const updateCurrentAlbumSong= (song,index)=>{
    setCurrentAlbumSong({id:index,owner:song.artist,thumbnail:song.thumbnail,songFile:song.songFile,title:song.title})
    console.log(currentSong)
    setCurrentSong({id:index,owner:song.artist,thumbnail:song.thumbnail,songFile:song.songFile,title:song.title})
    
  } 

  const musicControl = (song) =>{
    console.log("chalo humare yaha to aaya ")
    console.log(song)
    const currentAudio = audioElement.src
    const newAudio = song.songFile
    // case if the audio that has been paused has been played again
      if(play==false && currentAudio == newAudio){
          audioElement.play()  
          setPlay(true)
      }

      // if audio is being played now and new audio has been clicked 
      else if(currentAudio!=newAudio){
        console.log("edhar bhi phuch hi gya tha ")
        audioElement.src= newAudio
        setAudioElement(audioElement);
        console.log(audioElement.src)
        audioElement.play()
        setPlay(true)

      }

      // if the audio being currently played is being clicked again 
      else if(play==true && currentAudio == newAudio){
        audioElement.pause()
        setPlay(false)
      }

    }


    

const RequireAuth = ({ children }) => {
  const data = JSON.parse(localStorage.getItem("data"))
  console.log(data)
  if(data===null || data === undefined || Object.keys(data).length === 0){
    console.log("came here for gand marana");
    return  <Navigate to="/login" />;
  }
  
  return children
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element= {<Layout/>}>
        <Route path = '' element = {<RequireAuth>  <Home /> </RequireAuth>}/>
        <Route path="login" element = {<Login/>}/>
        <Route path='music' element = {<RequireAuth><SongAlbum />  </RequireAuth>}/>
        <Route path='register' element = {<Register/>}/>
        <Route path='upload' element ={  <UploadSong /> }/>
        <Route path='search' element ={<RequireAuth>  <Search /> </RequireAuth>}/>
        <Route path='history' element ={<RequireAuth>  <History /> </RequireAuth>}/>
        <Route path='ys' element ={<RequireAuth>  <YourSongs /> </RequireAuth>}/>
        <Route path='cp' element ={<RequireAuth>  <CreatePlaylist /> </RequireAuth>}/>
        <Route path ='p' element ={<RequireAuth>  <Playlist /> </RequireAuth>}/>
    </Route>
  )
)


  return (
    <>
      <CurrentSongProvider value= {{updateSong,currentSong,currentAlbumSong,updateCurrentAlbumSong,play,musicControl,audioElement}}>
        <RouterProvider router={router}></RouterProvider>
      </CurrentSongProvider>
     
    </>
  )
}

export default App