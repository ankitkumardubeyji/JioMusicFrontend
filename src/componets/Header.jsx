
import {Link, NavLink, Navigate, useNavigate} from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import {useDispatch, useSelector } from 'react-redux';
import {logout} from '../Reducer/authSlice';
import { useState } from 'react';
import { getArtistProfile, getSongs, searchSongs } from '../Reducer/songSlice';
import MenuIcon from '@mui/icons-material/Menu';


function Header(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function handleLogOut(event){
        event.preventDefault()
        console.log("came here for logout")
      const res =  dispatch(logout()).then(()=>navigate("/login"))
       console.log(res);
    }

    function handleLogin(event){
        navigate("/login");
    }

    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const data = useSelector(state => state.auth.data)
    const albumData = useSelector(state=>state.song.albumData)
    console.log(isLoggedIn)
    console.log("here comes the data "+data.avatar)

    function handleMenu(){
        console.log("hine aawa")
        document.getElementsByClassName("left-slide")[0].classList.toggle('left-slide-active')
    }

   
        function handleSubmit(e) {
            e.preventDefault();
            console.log("here came for the submission");
            console.log(searchValue);
            let searchQuery = `?query=${searchValue}`;
            
            // Dispatch searchSongs action first
            dispatch(searchSongs(searchQuery))
                .then((searchSongsResult) => {
                    // Check if searchSongs returned valid results
                    if (searchSongsResult.length > 0) {
                        // If searchSongs returned valid results, navigate to the search page
                        navigate("/search");
                    } else {
                        // If searchSongs did not return valid results, dispatch getArtistProfile
                        dispatch(getArtistProfile(searchValue))
                            .then((getArtistProfileResult) => {
                                // Check if getArtistProfile returned valid results
                                if (getArtistProfileResult) {
                                    // If getArtistProfile returned valid results, navigate to the music page
                                    navigate("/music");
                                } else {
                                    // If neither searchSongs nor getArtistProfile returned valid results, display "not found" message
                                    console.log("Not found");
                                }
                            })
                            .catch((error) => {
                                console.error("Error dispatching getArtistProfile:", error);
                            });
                    }
                })
                .catch((error) => {
                    console.error("Error dispatching searchSongs:", error);
                });
        }
        
        
    
const [searchValue,setSearchValue] = useState("")
    return (
        <>
         <div className="header">
        <nav>
            <div className="logo">
                <MenuIcon className='menu' onClick={handleMenu}/>
                <img src="https://tse2.mm.bing.net/th?id=OIP.R137HYqG1Wnv0ADZ2bFkbQHaCn&pid=Api&P=0&h=180" alt=""/>
                <div className="items">
                <Link to="/music">Music</Link>
                <Link to="/upload">UploadSong</Link>
                <Link to="/">Home</Link>
            </div>
            </div>

            <div className="search-box">
                <p>
                    <form onSubmit={handleSubmit}>
                        <input className="form-input" type="text" name="search" placeholder="Song Search" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
                        <button className="btn"><img src="search.png" alt=""/></button>
                    </form>
                </p>
            </div>

            <div className="side-nav">
                <a href="">Music Languages</a>
                {isLoggedIn?(<a href="#" onClick={handleLogOut}>LogOut</a>):<Link to="/login" >Login</Link>}
                {isLoggedIn?(<a href="#" style={{borderRadius:"100%", width:"50px", padding:"2px 2px "}}><img src={data.avatar} width={"100%"}/></a>):<a href=""><PersonIcon/></a>}
                
            </div>
        </nav>
    </div>
        </>
      )
}

export default Header
