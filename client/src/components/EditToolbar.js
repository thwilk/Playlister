import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';
import { Link } from 'react-router-dom';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/

function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);

    function handleUndo() {
        store.undo();
    }

    function handleRedo() {
        store.redo();
    }

    return (
        <div id="edit-toolbar">
            <Button
                disabled={!store.canAddNewSong()}
                id='add-song-button'
                component={Link}
                to="/songCatalog"  
                variant="contained"
            >
                <AddIcon />
            </Button>

            <Button 
                disabled={!store.canUndo()}
                id='undo-button'
                onClick={handleUndo}
                variant="contained"
            >
                <UndoIcon />
            </Button>

            <Button 
                disabled={!store.canRedo()}
                id='redo-button'
                onClick={handleRedo}
                variant="contained"
            >
                <RedoIcon />
            </Button>

            <Button 
                disabled={!store.canClose()}
                id='close-button'
                component={Link}
                to="/"      // navigate home
                onClick={() => store.closeCurrentList()}
                variant="contained"
            >
                <CloseIcon />
            </Button>
        </div>
    );
}

export default EditToolbar;
