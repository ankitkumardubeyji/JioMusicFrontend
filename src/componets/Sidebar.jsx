import { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { artistsFollowing } from "../Reducer/followSlice"
import { useNavigate } from "react-router-dom"
import { getArtistProfile, getListenHistory, getYourSongs } from "../Reducer/songSlice"
import { getSongsInPlaylist, getUserPlaylist } from "../Reducer/playlistSlice"

function Sidebar(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
   function handleHistory(){
    dispatch(getListenHistory()).then((res)=>navigate('/history'))
   }

   const yourSongs = useSelector(state=>state.song.yourSongs)
   function handleYourSongs(){
    dispatch(getYourSongs()).then((res)=>{
        console.log(yourSongs)
        navigate("/ys")
    })
    
    //navigate("/ys")
   }
    const [Arts,setArts] = useState([])
    const[playlist,setPlaylist] = useState([])

    const arts = useSelector(state=>state.follow.followingArtists)

    const userPlaylists = useSelector(state=>state.playlist.userPlaylists)
    console.log(userPlaylists)
    console.log(arts.length+" "+" is the length")
    
    useEffect(()=>{
      dispatch(artistsFollowing())
      dispatch(getUserPlaylist()).then(()=>setPlaylist(userPlaylists))
      setArts(arts)
      
    },[])

    return(
        <>
           
        <div className="left-slide">

        <h1>LIBRARY</h1>
            <p onClick={handleHistory}><i className="fa-thin fa-clock-rotate-left"></i>History</p>
            <p onClick={handleYourSongs}><i className="fa-regular fa-music-note"></i>Songs</p>
            <p><i className="fa-sharp fa-regular fa-record-vinyl"></i>Albums</p>
            <p><i className="fa-thin fa-podcast"></i>Podcasts</p>
            <p><i className="fa-thin fa-microphone-stand"></i>Artists</p>


        <h1> Your Playlists</h1>
        {
            playlist.map((item,index)=>
                <p key={index} onClick= {()=>{dispatch(getSongsInPlaylist(item._id)).then(()=>navigate("/p"))}} style={{display:"flex",alignItems:"center",gap:"10px", borderRadius:"100%"}}> <img src={item.thumbnail} width="50px" style={{borderRadius:"100%"}}></img> {item.name}</p>
           
                )
            
        }
        
    
        <h1>Artists Following</h1>
            {
                Arts.map((art,index)=>
                    <p key={index} onClick= {()=>{dispatch(getArtistProfile(art.artists.username)).then(()=>navigate("/music"))}}style={{display:"flex",alignItems:"center",gap:"10px", borderRadius:"100%"}}> <img src={art.artists.avatar} width="50px" style={{borderRadius:"100%"}}></img> {art.artists.fullName} </p>
                )
            }


            

          

        
        </div>
      
        
        </>
    )

}


export default Sidebar;