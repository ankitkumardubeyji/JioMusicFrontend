import { useDispatch, useSelector } from "react-redux";
import useCurrentSong from "../contexts/CurrentSongContext";
import Music from "./Music"
import { artistsFollowing, toggleFollowingStatus } from "../Reducer/followSlice";
import { useState } from "react";
import { getArtistProfile } from "../Reducer/songSlice";
import { useNavigate } from "react-router-dom";
function SongAlbum(){
console.log("came to the album")
  
   

    const {currentAlbumSong,updateCurrentAlbumSong} = useCurrentSong()

    const album= useSelector(state=>state.song.albumData)
    console.log(album)

    const [count,setCount] = useState(album.FollowersCount)
    const [follow,setfollow] = useState(album.isFollowing)

    const albumData = album.songs
    //console.log(albumData[0].thumbnail)

const navigate = useNavigate()

const dispatch = useDispatch()
    function handleFollow(){
        console.log("came for updating the follow status")
        console.log(album.username)
        dispatch(toggleFollowingStatus(album.username)).then((res)=>console.log(res)).then(()=>  dispatch(getArtistProfile(album.username)).then((res)=>{
            
            setCount(res.payload.FollowersCount)
            setfollow(!follow)   
        })).then(()=> dispatch(artistsFollowing(album.username)))
      
      

       
    }   


   // updateCurrentAlbumSong(albumData[0])
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

    return(
        <>
      
        <div className="row" style={{display:"flex",gap:"50px", marginTop:"80px"}}>
  
            <div className="lg:w-2/6 xl:w-2/7 sm:w-full md:w-2/3 w-600   bg-aliceblue  shadow-lg    transform   duration-200 easy-in-out px-0 ">
                <div className=" h-32 overflow-hidden" >
                    <img className="w-full" src={album.avatar} alt="" />
                </div>
                <div className="flex justify-center px-5  -mt-12">
                    <img className="h-32 w-32 bg-white p-2 rounded-full " src={album.avatar} alt="" />

                </div>
                <div className=" ">
                    <div className="text-center px-14">
                        <h2 className="text-gray-800 text-3xl font-bold">{album.fullName}</h2>
                        <a className="text-gray-400 mt-2 hover:text-blue-500" href="https://www.instagram.com/immohitdhiman/" target="BLANK()">@{album.username}</a>
                        <p className="mt-2 text-gray-500 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
                    </div>
                    <hr className="mt-6" />
                    <div className="flex  bg-gray-50 ">
                        <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                            <p><span className="font-semibold">{count} </span> Followers</p>
                        </div>
                        <div className="border"></div>
                        
                        
                        <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">
                            <p> <span className="font-semibold">{albumData.length} </span> Songs</p>
                        </div>

                        <div className="text-center w-1/2 p-4 hover:bg-gray-100 cursor-pointer">

                            {follow ? (<p style={{color:"blue"}} onClick={handleFollow}> <span className="font-semibold" ></span> Following</p>) : ( <p style={{color:"red"}} onClick={handleFollow}> <span className="font-semibold" > </span> Follow</p>)}
                     
                        </div>
                        
                    </div>
                </div>
            </div>




        <div className="songItemsList">

            <div className="topi" style={{marginBottom:"20px"}}>
                <h1>Queue</h1>
                <div className="f">
                    <i className="fa-solid fa-ellipsis"></i>
                    <button className="save">Save</button>
                    <button className="clear">Clear</button>
                </div>
            </div>
        
       
{
    
    albumData.map((song,index)=><Music thumbnail={song.thumbnail} songName={song.title} src="" singer={album.fullName} id = {index} type=""/>)
}
</div>
    

</div>
        </>
    )
}

export default SongAlbum;
