import { useContext, useState, useEffect} from 'react'
import { GlobalStoreContext } from '../store'
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { song, index, usersPlaylists } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);

    useEffect(() => {
        console.log("SOUNDCARD PRINTING FROM USERPLAYLIST" + usersPlaylists + "{}");

    }, [])


    //menu
    const handleMenuOpen = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const handleAddToPlaylist = (playlistId, song) => {
        //rodo 
        
    };

    const handleEditSong = (song, index) => {
       //todo
    };

    const handleDeleteSong = (song, index) => {
        //todo  
    };

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
    }

    function handleDragLeave(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        store.addRemoveSongTransaction(song, index);
    }
    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2) {
            console.log("double clicked");
            store.showEditSongModal(index, song);
        }
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            style={{ position: "relative" }}  
            onClick={handleClick}
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} ({song.year}) by {song.artist}
            </a>
            <div style={{ fontSize: "0.9rem", color: "gray" }}>
                Listens: {song.listens || 0}
            </div>
            <IconButton
                size="small"
                onClick={handleMenuOpen}
                sx={{ position: "absolute", top: 5, right: 5 }}
            >
                <MoreVertIcon fontSize="small" />
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            {showPlaylistMenu && (
                    <div
                        style={{
                            maxHeight: "200px",
                            overflowY: "auto",
                            borderLeft: "1px solid #ddd",
                            marginLeft: "15px",
                            paddingLeft: "10px"
                        }}
                    >
                        {usersPlaylists.length === 0 ? (
                            <MenuItem disabled>No playlists found</MenuItem>
                        ) : (
                            usersPlaylists.map((p) => (
                                <MenuItem
                                    key={p._id}
                                    onClick={() => {
                                        handleAddToPlaylist(p._id, song);
                                        handleMenuClose();
                                    }}
                                >
                                    {p.name}
                                </MenuItem>
                            ))
                        )
                        }
                    </div>
                )}
                <MenuItem
                    onClick={() => setShowPlaylistMenu((prev) => !prev)}
                >
                    Add to Playlist
                </MenuItem>
                <MenuItem onClick={() => { handleEditSong(song, index); handleMenuClose(); }}>
                    Edit Song
                </MenuItem>
                <MenuItem onClick={() => { handleDeleteSong(song, index); handleMenuClose(); }}>
                    Delete Song
                </MenuItem>
            </Menu>
        </div>
    );
}

export default SongCard;