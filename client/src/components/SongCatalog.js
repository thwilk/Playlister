import { useContext, useEffect, useState } from 'react';
import { GlobalStoreContext } from '../store';
import GlobalAuthContext  from '../auth'; // ⬅️ NEW: Import Auth Context
import SongCard from './SongCard';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function SongCatalog() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(GlobalAuthContext); 
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [year, setYear] = useState("");
    const [youtubeId, setYoutubeId] = useState("");
    const [isQueryMode, setIsQueryMode] = useState(false);

    const [_, setRerender] = useState(false); // dummy state to force rerender

    const [userPlaylist, setUserPlaylist] = useState([]);

    useEffect(() => {
        store.loadSongs()
        async function fetchPlaylists() {
            try {
                const playlists = await store.getUserPlaylist()
                setUserPlaylist(playlists)
                console.log("Fetched user playlists:", playlists)
            } catch (err) {
                console.error("Error fetching playlists:", err)
            }
        }
        fetchPlaylists()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (auth.isGuest && !isQueryMode) return; 
        if (isQueryMode) {
            store.querySongs(title, artist, year);
        } else {
            store.addSongToCatalog(title, artist, parseInt(year), youtubeId);
        }
    };

    const handleSort = (criteria) => {
        if (!store.songs) return;
        let sorted = [...store.songs];
        switch(criteria) {
            case 'listens-hi': sorted.sort((a,b) => (b.listens||0) - (a.listens||0)); break;
            case 'listens-lo': sorted.sort((a,b) => (a.listens||0) - (b.listens||0)); break;
            case 'playlists-hi': sorted.sort((a,b) => (b.playlistCount||0) - (a.playlistCount||0)); break;
            case 'playlists-lo': sorted.sort((a,b) => (a.playlistCount||0) - (b.playlistCount||0)); break;
            case 'title-az': sorted.sort((a,b) => a.title.localeCompare(b.title)); break;
            case 'title-za': sorted.sort((a,b) => b.title.localeCompare(a.title)); break;
            case 'artist-az': sorted.sort((a,b) => a.artist.localeCompare(b.artist)); break;
            case 'artist-za': sorted.sort((a,b) => b.artist.localeCompare(a.artist)); break;
            case 'year-hi': sorted.sort((a,b) => b.year - a.year); break;
            case 'year-lo': sorted.sort((a,b) => a.year - b.year); break;
            default: break;
        }
        store.songs = sorted;
        setRerender(prev => !prev); // trigger re-render
    };

    return (
        <Box sx={{ p: 3 }}>
            {auth.isGuest && (
                <>
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                        <Button
                            variant={isQueryMode ? "outlined" : "contained"}
                            color="success"
                            onClick={() => setIsQueryMode(false)}
                        >
                            Add New Song
                        </Button>
                        <Button
                            variant={isQueryMode ? "contained" : "outlined"}
                            color="primary"
                            onClick={() => setIsQueryMode(true)}
                        >
                            Query Songs
                        </Button>
                    </Stack>

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}
                    >
                        <TextField
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            size="small"
                        />
                        <TextField
                            label="Artist"
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                            size="small"
                        />
                        <TextField
                            label="Year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            size="small"
                        />
                        {!isQueryMode && (
                            <TextField
                                label="YouTube ID"
                                value={youtubeId}
                                onChange={(e) => setYoutubeId(e.target.value)}
                                size="small"
                            />
                        )}
                        <Button type="submit" variant="contained">
                            {isQueryMode ? "Search" : "Submit"}
                        </Button>
                    </Box>
                </>
            )}
            
            <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
                {["listens-hi","listens-lo","playlists-hi","playlists-lo",
                  "title-az","title-za","artist-az","artist-za","year-hi","year-lo"].map((c) => (
                    <Button key={c} size="small" variant="outlined" onClick={() => handleSort(c)}>
                        {c.replace("-", " ").toUpperCase()}
                    </Button>
                ))}
            </Stack>

            {store.songs && store.songs.length > 0 ? (
                <Stack spacing={1}>
                    {store.songs.map((song, index) => (
                        <SongCard
                            key={song._id || song.id}
                            song={song}
                            index={index}
                            usersPlaylists={userPlaylist || []}
                        />
                    ))}
                </Stack>
            ) : (
                <p>No songs found.</p>
            )}
        </Box>
    );
}

export default SongCatalog;