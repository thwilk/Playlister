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

    const [isQueryMode, setIsQueryMode] = useState(false)

    useEffect(() => {
        store.loadSongs()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isQueryMode) {
            // Query mode
            store.querySongs(title, artist, year)
        } else {
            // Add mode
            store.addSongToCatalog(title, artist, parseInt(year), "noId's")
        }

        setTitle("")
        setArtist("")
        setYear("")
    }

    return (
        <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
                <button
                    onClick={() => setIsQueryMode(false)}
                    style={{ background: !isQueryMode ? "lightgreen" : "white" }}
                >
                    Add New Song
                </button>

                <button
                    onClick={() => setIsQueryMode(true)}
                    style={{ background: isQueryMode ? "lightblue" : "white" }}
                >
                    Query Songs
                </button>
            </div>

            <div>
                <h2>{isQueryMode ? "Query Songs" : "Add New Song"}</h2>

                <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
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

                    <button type="submit">
                        {isQueryMode ? "Search" : "Submit"}
                    </button>
                </form>
            </div>

            <div style={{ marginTop: "30px" }}>
                <h2>Song Catalog</h2>

                {!store.songs || store.songs.length === 0 ? (
                    <p>No songs found.</p>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {store.songs.map((song, index) => (
                            <SongCard
                                key={song._id || song.id}
                                song={song}
                                index={index}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SongCatalog
