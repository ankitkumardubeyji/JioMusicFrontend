import { useDispatch, useSelector } from "react-redux";
import useCurrentSong from "../contexts/CurrentSongContext";
import Image  from "./Image"
import Music from "./Music";
import { useEffect } from "react";
import { getListenHistory } from "../Reducer/songSlice";



function History(){
    const song = useSelector((state)=>state.song.listenHistory)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log("here");
        dispatch(getListenHistory());
    }, [dispatch]);
    
    console.log(song)
    const {currentSong,updateCurrentAlbumSong} = useCurrentSong()
    


    let songs = [
        {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
        {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
        {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
        {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
        {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
        {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
        {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
        {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
        {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
        {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
    ]

    return(
        
        <>  
              
    <div className="rowi">
        <div className="left">
            <div className="image">
                <img src={currentSong.thumbnail} alt=""/>
            </div>
            <h1>{currentSong.title}</h1>
            <p>{currentSong.owner}</p>

        </div>

        <div className="songItemsList">

            <div className="topi">
                <h1>Queue</h1>
                <div className="f">
                    <i className="fa-solid fa-ellipsis"></i>
                    <button className="save">Save</button>
                    <button className="clear">Clear</button>
                </div>
            </div>
        
       
{
    
    song.map((song,index)=><Music thumbnail ={song.thumbnail} songName={song.title} src="" singer={song.owner} id = {index} type="song" type="his"/>)
}
</div>
       </div>

        
        </>
    
    )
}

export default History