import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import GlobalAuthContext from '../auth'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Avatar from '@mui/material/Avatar';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/

function PlaylistCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(GlobalAuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;
    
    const isGuest = auth.isGuest;

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            store.setCurrentList(id);
        }
    }


    function handleToggleEdit(event) {
        event.stopPropagation();
        if (isGuest) return;
        setEditActive((prev) => {
            if (!prev) store.setIsListNameEditActive();
            return !prev;
        });
    }


    async function handleDeleteList(event, id) {
        event.stopPropagation();
        if (isGuest) return;
        //let _id = event.target.id;
        //_id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }


    async function handleCopyList(event, id) {
        event.stopPropagation();
        if (isGuest) return;
        //todo
        // store.copyPlaylist(id);
    }


    function handlePlayList(event, id) {
        event.stopPropagation();
        //todo
        // store.playPlaylist(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            store.changeListName(idNamePair._id, text);
            setEditActive(false);
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let cardElement;

    if (editActive) {
        cardElement = (
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{ style: { fontSize: 36 } }}
                InputLabelProps={{ style: { fontSize: 18 } }}
                autoFocus
            />
        );
    } else {
        cardElement = (
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{
                borderRadius: "15px",
                p: 2,
                bgcolor: '#f3f3f3',
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
            button
            onClick={(event) => handleLoadList(event, idNamePair._id)}
        >




            <Avatar
                alt={idNamePair.userName || "user"}
                src={idNamePair.userAvatar || "/default-avatar.png"}
                sx={{ width: 50, height: 50, mr: 2 }}
            />




            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {idNamePair.name}
                </Box>
                <Box sx={{ fontSize: '0.9rem', color: 'gray' }}>
                    {idNamePair.userName || "Unknown User"}
                </Box>
            </Box>






            <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton onClick={(e) => handlePlayList(e, idNamePair._id)} aria-label="play">
                    <PlayArrowIcon />
                </IconButton>
                
                {isGuest && (
                    <>
                        <IconButton 
                            onClick={(e) => handleCopyList(e, idNamePair._id)} 
                            aria-label="copy"
                        >
                            <ContentCopyIcon />
                        </IconButton>
                        <IconButton 
                            onClick={handleToggleEdit} 
                            aria-label="edit"
                        >
                            <EditIcon />
                        </IconButton>
                        <IconButton 
                            onClick={(e) => handleDeleteList(e, idNamePair._id)} 
                            aria-label="delete"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </>
                )}
            </Box>
        </ListItem>
        );
    }

    return cardElement;
}

export default PlaylistCard;