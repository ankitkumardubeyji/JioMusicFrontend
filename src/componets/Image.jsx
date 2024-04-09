import { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import useCurrentSong from "../contexts/CurrentSongContext";
import { useSelector,useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { addSongToPlaylist } from "../Reducer/playlistSlice";
function Image(props){

  const dispatch = useDispatch()
  const navigate = useNavigate()

    console.log(props)
    const {updateSong,currentSong,musicControl} = useCurrentSong();
      let song = useSelector((state)=>state.song.songsData)
      const userPlaylists = useSelector(state=>state.playlist.userPlaylists)
      console.log(userPlaylists)

    console.log(song)

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

    function update(e){
        let index = e.target.parentElement.id
       console.log(songs[e.target.parentElement.className=="box1"?e.target.parentElement.id:e.target.id]) 
       console.log(e.target.parentElement.className=="box1"?e.target.parentElement.id:e.target.id)
       updateSong(song[index],index)
       musicControl(song[index])
       console.log(currentSong)
       
    }
    


   

    console.log(props)
    return (
        <>
          <div className="box1 "  id={props.id}
           onMouseOver={()=>{document.getElementById(props.id).classList.add('active')}}
           onMouseOut={()=>document.getElementById(props.id).classList.remove('active')}
           onContextMenu={()=> document.getElementById(props.id).querySelector('.dropdown').classList.toggle('dropActive')}
           
           >
                        <img src= {props.src} alt=""/>
                        <p className="songName">{props.songName}</p>
                        <div className="layer"onClick={(e)=>update(e)}>
                          <FavoriteIcon style={{color:"red"}}/>
                          <PlayArrowIcon style={{color:"white"}}/>
                        </div>

                        <div className="dropdown">
                          <h2 onMouseEnter={()=>document.getElementById(props.id).querySelector('.PlaylistBox').classList.add('addPlaylistActive')}
                           
                          >Add To Playlist</h2>
                            <div className="PlaylistBox"  onMouseLeave={()=>document.getElementById(props.id).querySelector('.PlaylistBox').classList.remove('addPlaylistActive')} >
                              <h3> <Link to="/cp">+ Create new Playlist</Link></h3>
                                <ul style={{marginLeft:"10px"}}>
                                  {
                                      userPlaylists.map((item)=>
                                        <li style={{marginLeft:"17px"}} onClick={()=>dispatch(addSongToPlaylist(`${props._id}/${item._id}`))}>{item.name}  </li>
                                      )
                                  }
                                </ul>

                            </div>
                          <h3>PlaySong</h3>
                        </div>
                    </div>
        </>
      )
}

export default Image