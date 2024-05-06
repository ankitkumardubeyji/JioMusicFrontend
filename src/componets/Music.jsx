
import { useSelector } from "react-redux";
import useCurrentSong from "../contexts/CurrentSongContext";
import zIndex from "@mui/material/styles/zIndex";

function Music({thumbnail,songName,singer,id,type}){
    console.log(thumbnail)
    const {updateSong,currentSong,updateCurrentAlbumSong,musicControl} = useCurrentSong();
   
    let song1 =  useSelector(state=>state.song.searchData)
    let albumData =  useSelector(state=>state.song.albumData)
    let song3 = useSelector(state=>state.song.listenHistory)
    let song4 = useSelector((state)=>state.song.yourSongs)
    let song2 = albumData.songs;
    let owner2 = albumData.fullName;
    let artist = "";


    let song= useSelector(state=>state.song.songsData)

    if(type=="song"){
        song = song1 
    }
    else if(type=="his"){
        song = song3;
    }

    else if(type=="ys"){
        song = song4
    }
    else{
        song = song2
        artist = owner2;
    }
console.log(song)
    let songs= [
        {songName:"Desi Kalakar" ,filepath:"songs/12.mp3" , coverPath:"covers/1.jpg" ,singer:'Honey Singh,Neha Kakkar'},
        {songName:"I am Your Dj Tonight" ,filepath:"songs/15.mp3" , coverPath:"covers/2.jpg", singer:'Honey Singh,Badhshah'},
        {songName:"Love Dose " ,filepath:"songs/14.mp3" , coverPath:"covers/3.jpg", singer:'Honey Singh,Raftaar'},
        {songName:"Daftar Ki Girl " ,filepath:"songs/16.mp3" , coverPath:"covers/4.jpg", singer:'Honey Singh,Lil Golu'},
        {songName:"Stardom" ,filepath:"songs/18.mp3" , coverPath:"covers/5.jpg", singer:'Yo Yo Honey Singh'},
        {songName:"Brown Rang" ,filepath:"songs/11.mp3" , coverPath:"covers/6.jpg", singer:'Yo Yo Honey Singh'},
        {songName:"Dope Shope" ,filepath:"songs/19.mp3" , coverPath:"covers/7.jpg", singer:'Yo Yo Honey Singh,Astah Gill'},
        {songName:"Blue Eyes" ,filepath:"songs/13.mp3" , coverPath:"covers/8.jpg", singer:'Yo Yo Honey Singh,Justin'},
    ]
    function update(e){
        console.log("came here for updating the album song ")
        let index = e.target.parentElement.className==="song"?e.target.parentElement.id:e.target.id
        console.log(index)
        if(song[index]===undefined || song[index]===null ){
            console.log("here")
            return
        }
        console.log(artist)
        updateCurrentAlbumSong({owner:artist,...song[index]},index)
        updateSong({owner:artist,...song[index]},index)
        musicControl(song[index])
    }

    
    return(
        <>
           <div className="song" id={id} onClick={(e)=> update(e) }>
            <img src={thumbnail} />

            <div className="nonactive">
            <i className="far fa-3x fa-play-circle" id="playstate" ></i>
            </div>

            <img src="assets/playing.gif" alt="" className="gif nonactive"/>
            <div className="song-title">
                <h1 className="songName" onClick={(e)=>e.stopPropagation()}>{songName}</h1>
                <span className="singer">{singer}</span>
            </div>
            <i className="fa-regular fa-heart"></i>
            <span className="timestamp">5:34</span>
         </div>
        
        </>
    )
}

export default Music