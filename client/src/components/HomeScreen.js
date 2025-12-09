import { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import PlaylistCard from './PlaylistCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import PlaylistSearchPanel from './PlaylistSearch.js'

const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [_, setRerender] = useState(false);


    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }

    function handleSort(type) {
        store.sortPlaylists(type);
        setRerender(prev => !prev); 
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
                            marginBottom: "16px",
                            fontWeight: 600
                        }}
                    >
                        Playlists
                    </h1>

                    <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                        <Button variant="outlined" onClick={() => handleSort('listenersHiLo')}>Listeners Hi→Lo</Button>
                        <Button variant="outlined" onClick={() => handleSort('listenersLoHi')}>Listeners Lo→Hi</Button>
                        <Button variant="outlined" onClick={() => handleSort('nameAZ')}>Name A→Z</Button>
                        <Button variant="outlined" onClick={() => handleSort('nameZA')}>Name Z→A</Button>
                        <Button variant="outlined" onClick={() => handleSort('userAZ')}>User A→Z</Button>
                        <Button variant="outlined" onClick={() => handleSort('userZA')}>User Z→A</Button>
                    </Box>

                    {listCard}
                    <MUIDeleteModal />
                </Box>
            </Box>
        </div>
    );
};

export default HomeScreen;
