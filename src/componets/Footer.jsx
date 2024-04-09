import useCurrentSong from "../contexts/CurrentSongContext";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useEffect, useMemo, useState } from "react";
import { duration } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";


let songs = [
    {id:0,songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg",singer:"Jollu"},
    {id:1,songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg",singer:"YO YO HONEY SINGH"},
    {id:2,songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg",singer:"Raftar"},
    {id:3,songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg",singer:"Badhshah"},
    {id:4,songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg",singer:"Raftar"},
    {id:5,songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg",singer:"Jolu"},
    {id:6,songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg",singer:"Neha Kakkar"},
    {id:7,songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg",singer:"Jollu"},
    {id:8,songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg",singer:"Nikk"},
    {id:9,songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg",singer:"Ninja"},
]




function Footer(){
    

    let song1 = useSelector((state)=>state.song.songsData)
    let albumData = useSelector((state)=>state.song.albumData)
    let song2 = albumData.songs
    let song3 = useSelector((state)=>state.song.searchData)

    let song =""

    let song4 = useSelector((state)=>state.song.listenHistory)

    let song5 = useSelector((state)=>state.song.yourSongs)
    const location = useLocation()
    
    if(location.pathname=='/'){
        song = song1
        console.log(location.pathname+" "+song)
    }

    else if(location.pathname=='/music'){
        song = song2
        console.log(location.pathname+" "+song)
    }

    else if(location.pathname=='/search'){
        song = song3
        console.log(location.pathname+" "+song)
    }

    else if(location.pathname=='/ys'){
        
        song = song5 
        console.log(location.pathname+" "+song)
    }
    

    else if(location.pathname=='/history'){

        song = song4 
        console.log(location.pathname+" "+song)
    }

   

    console.log(song)

    const {currentSong,musicControl,audioElement,play,updateSong} = useCurrentSong()
    const [volume,setVolume]  = useState(audioElement.volume)
    const [currentDuration,setCurrentDuration] = useState('')
    const [duration,setDuration] = useState('');

    useEffect(()=>{
        console.log(audioElement)
        console.log(audioElement.duration)
        setDuration(parseInt(audioElement.duration/60) +": "+parseInt(audioElement.duration)%60+"")
        console.log(currentSong)
    },[audioElement,currentSong])
    

    function playPrev(){
        console.log("previous ganna update karana aa gye ");
        console.log(currentSong)
        const prevId = parseInt(currentSong.id)
        if(prevId>0){
            updateSong(song[prevId-1])
            musicControl(song[prevId-1]);
        }
    }


    function playNext(){
        console.log("next ganna update krwane aa gye ")
        console.log(currentSong)
        const prevId = parseInt(currentSong.id)
        console.log(prevId)
        console.log(song[prevId+1])
        if(prevId<song.length-1){
            updateSong(song[prevId+1],prevId+1)
            musicControl(song[prevId+1]);
        }
        else{
            updateSong(song[0],1)
            musicControl(song[0]);
        }
    }

    function setVisibility(){
        document.querySelector(".time-duration input").style.visibility="visible";
        setTimeout(()=>{
            document.querySelector(".time-duration input").style.visibility="hidden";
        },5000)
    }



    function updateVolume(e){
        console.log(e.target.value)
        console.log(volume+" is the volume")
        console.log(audioElement.volume+" is the audioelement value")
        setVolume(e.target.value)
        audioElement.volume = e.target.value/100;
        console.log(volume+" is the volume")
        console.log(audioElement.volume +" is the audioelement value ")
    }

    function updateDuration(e){
        setProgress(e.target.value)
        audioElement.currentTime = (e.target.value / 100 )*audioElement.duration;
      
    }

    const [progress,setProgress] = useState(0)

    audioElement.addEventListener('loadedmetadata',()=>{
            setDuration(parseInt(audioElement.duration/60) +": "+parseInt(audioElement.duration)%60+"")
    })
   

    audioElement.addEventListener('timeupdate',()=>{
        setProgress(parseInt((audioElement.currentTime/audioElement.duration)* 100))
        setCurrentDuration(parseInt(audioElement.currentTime/60) +": "+parseInt(audioElement.currentTime)%60+"");
    })

    

    return(
        <>
        <div className="foot">
            <input type="range" name="range" id="myProgressBar" min="0" value={progress} max="100" onChange={updateDuration} />
            <div className="footer">
                <div className="songInfo">
                    <img src= {currentSong.thumbnail} width="42px" alt="" id="gif"/>
                    <div className="titles">
                        <p id="masterSongName">{currentSong.title}<br/></p>
                        <p id="singer">{currentSong.owner}</p>
                    </div>
                     
                </div>

                <div className="song-control" style={{cursor:"pointer"}}>
                   <SkipPreviousIcon onClick={playPrev}/>
                   {!play && (  <PlayArrowIcon onClick={()=>musicControl(currentSong)}/>) }
                   {play && (<PauseIcon onClick = {()=>musicControl(currentSong) } />) }
                   <SkipNextIcon id= "next" onClick={playNext}/>
                  
                </div>

                <div className="time-duration" style={{position:"relative"}}>
                    <p><span className="timepassed">{currentDuration}</span>/<span className="timeduration">{duration}</span></p>
                    <a href="ind.html"><i className="fa-solid fa-ellipsis"></i></a>
                    <i className="fa-sharp fa-solid fa-volume"></i>
                    <i className="fa-solid fa-arrow-down-left-and-arrow-up-right-to-center"></i>
                    <VolumeUpIcon onClick={setVisibility}/> 
                    <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={updateVolume}
        style={{ width: '100%',position:"absolute",top:"30px",left:"40px",zIndex:10, visibility:"hidden"}} // Set the width to 100% to fill the container
      />
                   
                   
                </div>
        </div>
</div>
        
        </>
    )
}


export default Footer;