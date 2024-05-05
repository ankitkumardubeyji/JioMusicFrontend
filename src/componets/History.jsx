import { useDispatch, useSelector } from "react-redux";
import useCurrentSong from "../contexts/CurrentSongContext";
import Music from "./Music";
import { useMemo } from "react";
import { getListenHistory } from "../Reducer/songSlice";

function History() {
    const song = useSelector((state) => state.song.listenHistory);
    const dispatch = useDispatch();

    useMemo(() => {
        console.log("here");
        dispatch(getListenHistory()).then((res) => console.log("aa gya ji response " + res.payload));
    }, [dispatch]);

    console.log(song);
    const { currentSong, updateCurrentAlbumSong } = useCurrentSong();

    return (
        <>
            <div className="rowi">
                <div className="left">
                    <div className="image">
                        <img src={currentSong.thumbnail} alt="" />
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
                    {song.map((song, index) => (
                        <Music thumbnail={song.thumbnail} songName={song.title} src="" singer={song.owner} key={index} type="song" />
                    ))}
                </div>
            </div>
        </>
    );
}

export default History;
