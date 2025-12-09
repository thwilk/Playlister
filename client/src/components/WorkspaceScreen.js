import { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
//import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    const [songs, setSongs] = useState([]); // state to hold songs

    useEffect(() => {
        async function fetchSongs() {
            if (store.currentList && store.currentList.songKeys.length > 0) {
                const keys = store.currentList.songKeys;
                const fetchedSongs = await store.getSongs(keys); // await the promise
                setSongs(fetchedSongs); // store in state
            }
        }
        fetchSongs();
    }, [store.currentList]); // re-run when currentList changes
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    return (
        <Box id="list-selector-list">
        <List 
            id="playlist-cards" 
            sx={{overflow: 'scroll', height: '87%', width: '100%', bgcolor: '#8000F00F'}}
        >
            {
                songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                        showPlaylistMenuProp={false}
                    />
                ))  
            }
         </List>            
         { modalJSX }
         </Box>
    )
}

export default WorkspaceScreen;