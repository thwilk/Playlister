import { useContext, useEffect } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'

/**
 * Our Status bar React component goes at the bottom of our UI.
 * 
 * @author McKilla Gorilla
*/

function SongCatalog() {
    // const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadSongs();
    }, []);

    const songs = store.songs;


    return (

        <div>Songs are: {store.songs}</div>
    )
};


export default SongCatalog;