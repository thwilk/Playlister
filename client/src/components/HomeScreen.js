import { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import PlaylistCard from './PlaylistCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import PlaylistSearchPanel from './PlaylistSearch.js'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }


    const listCard = Array.isArray(store.idNamePairs) && store.idNamePairs.length > 0
        ? (
            <List sx={{ width: '100%', bgcolor: 'background.paper', mb: 2 }}>
                {store.idNamePairs.map(pair => (
                    <PlaylistCard key={pair._id} idNamePair={pair} selected={false} />
                ))}
                <Fab
                    sx={{ transform: "translate(1150%, 10%)" }}
                    color="primary"
                    aria-label="add"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
            </List>
        )
        : <p>No playlists found.</p>; 

    return (
        <div id="playlist-selector">
            <div id="list-selector-heading">
                <Fab
                    sx={{ transform: "translate(0%, 0%)" }}
                    color="primary"
                    aria-label="add"
                    onClick={handleCreateNewList}
                >
                    <AddIcon />
                </Fab>
                Your Playlists
            </div>

            <Box sx={{ display: "flex", height: "100%", minHeight: "500px" }} id="HomeWrapper">
                <Box sx={{ flex: 1, bgcolor: "background.paper", p: 2 }} id="Queries">
                    <PlaylistSearchPanel />
                </Box>

                <Divider orientation="vertical" flexItem />
                <Box sx={{ flex: 1, bgcolor: "background.paper", p: 2 }} id="list-selector-list">

                <h1
                style={{
                    color: "#1e88e5",
                    fontSize: "34px",
                    marginBottom: "32px",
                    fontWeight: 600
                }}
            >
                Playlists
            </h1>

                    {listCard}
                    <MUIDeleteModal />
                </Box>
            </Box>
        </div>
    );
};

export default HomeScreen;