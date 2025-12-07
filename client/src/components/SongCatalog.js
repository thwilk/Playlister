import { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import SongCard from './SongCard'
/**
 * Our Status bar React component goes at the bottom of our UI.
 * 
 * @author McKilla Gorilla
*/

function SongCatalog() {
    const { store } = useContext(GlobalStoreContext)

    const [title, setTitle] = useState("")
    const [artist, setArtist] = useState("")
    const [year, setYear] = useState("")

    useEffect(() => {
        store.loadSongs()
    }, [])

    const songs = store.songs || []

    const handleSubmit = (e) => {
        e.preventDefault()
        store.createSong({ title, artist, year })
        setTitle("")
        setArtist("")
        setYear("")
    }

    return (
        <div>
            <div>
                <h2>Add New Song</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Artist"
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />

                    <button type="submit">Submit</button>
                </form>
            </div>


            <div>
                <h2>Song Catalog</h2>
                {songs.length === 0 && <p>No songs found.</p>}
                <div>
                    {songs.map((song, index) => (
                        <SongCard 
                        key={song._id || song.id} 
                        song={song} 
                        index={index} 
                        />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default SongCatalog
