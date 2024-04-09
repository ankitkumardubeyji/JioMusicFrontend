import useCurrentSong from "../contexts/CurrentSongContext"
import {useSelector} from "react-redux"

function Playlist(){
    const songsInPlaylist = useSelector(state=>state.playlist.songsInPlaylist)
    const data = useSelector(state=>state.auth.data)

    const song = songsInPlaylist[1]
    const {updateCurrentAlbumSong,updateSong,musicControl} = useCurrentSong()

    function update(e){
        console.log("came here for updating the album song ")
        let index = e.target.parentElement.className==="song"?e.target.parentElement.id:e.target.id
        console.log(index)
        if(song[index]===undefined || song[index]===null ){
            console.log("here")
            return
        }
        //console.log(artist)
        updateCurrentAlbumSong({...song[index]},index)
        updateSong({...song[index]},index)
        musicControl(song[index])
    }



    console.log(songsInPlaylist)    
    return(
        <>

        <div className="playlists">
            <div className="playlistTop">
                <div className="pleft">
                    <img src="http://res.cloudinary.com/dvhobik2w/image/upload/v1712274524/anyppkdletd6bhc7hqad.png" alt="" />
                </div>
                <div className="pright">
                    <h1>Playlist</h1>
                    <h1 style={{fontSize:"70px"}}> {songsInPlaylist[0].name}</h1>
                    <h2>{data.fullName} {song.length} songs</h2>
                </div>
            </div>

{
        song.map((item,index)=>(
            <div key = {index} className="playlistBottom">
            <div className="song" id={index} onClick={(e)=> update(e) }>
            <img src={item.thumbnail} />

            <div className="nonactive">
            <i className="far fa-3x fa-play-circle" id="playstate" ></i>
            </div>

            <img src="assets/playing.gif" alt="" className="gif nonactive"/>
            <div className="song-title">
                <h1 className="songName" onClick={(e)=>e.stopPropagation()}>{}</h1>
                <span className="singer">{item.owner}</span>
            </div>
            <i className="fa-regular fa-heart"></i>
            <span className="timestamp">5:34</span>
         </div>
            </div>
        ))
}
</div>
        </>
    )
}


export default Playlist