import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

export default function PlaylistSearchPanel() {
    const { store } = useContext(GlobalStoreContext);

    const [filters, setFilters] = useState({
        name: "",
        username: "",
        songTitle: "",
        songArtist: "",
        songYear: ""
    });


    const handleClearField = (field) => {
        setFilters(prev => ({ ...prev, [field]: "" }));
    };

    const handleChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleSearch = () => {
        if(!(filters.name || filters.username || filters.songArtist || filters.songTitle || filters.songYear)){
            store.loadIdNamePairs();
        }
        else 
            store.queryPlaylists({ ...filters });
    };

    const handleClearAll = () => {
        setFilters({
            name: "",
            username: "",
            songTitle: "",
            songArtist: "",
            songYear: ""
        });
    };


    const rowStyle = {
        background: "#f5f5f5",
        borderRadius: "18px",
        padding: "14px 18px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        marginBottom: "26px",
        border: "1px solid #e0e0e0",
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
    };

    const inputStyle = {
        flexGrow: 1,
        border: "none",
        outline: "none",
        background: "transparent",
        fontSize: "18px",
        color: "#333",           // dark clean text
        fontWeight: 400
    };

    return (
        <Box
            sx={{
                padding: "30px",
                background: "white",
                height: "100%",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <h1
                style={{
                    color: "#1e88e5",
                    fontSize: "34px",
                    marginBottom: "32px",
                    fontWeight: 600
                }}
            >
                Catalog Search
            </h1>

            <Box sx={{ maxWidth: "600px" }}>
                <Box style={rowStyle}>
                    <input
                        placeholder="by Playlist Name"
                        value={filters.name}
                        onChange={(e) => handleChange("name", e.target.value)}           
                        style={inputStyle}
                    />
                    <IconButton onClick={() => handleClearField("name")}>
                        <ClearIcon />
                    </IconButton>
                </Box>

                <Box style={rowStyle}>
                    <input
                        placeholder="by Playlist Owner"
                        value={filters.username}
                        onChange={(e) => handleChange("username", e.target.value)}
                        style={inputStyle}
                    />
                    <IconButton onClick={() => handleClearField("username")}>
                        <ClearIcon />
                    </IconButton>
                </Box>

                <Box style={rowStyle}>
                    <input
                        placeholder="by Song Title"
                        value={filters.songTitle}
                        onChange={(e) => handleChange("songTitle", e.target.value)}
                        style={inputStyle}
                    />
                    <IconButton onClick={() => handleClearField("songTitle")}>
                        <ClearIcon />
                    </IconButton>
                </Box>

                <Box style={rowStyle}>
                    <input
                        placeholder="by Song Artist"
                        value={filters.songArtist}
                        onChange={(e) => handleChange("songArtist", e.target.value)}
                        style={inputStyle}
                    />
                    <IconButton onClick={() => handleClearField("songArtist")}>
                        <ClearIcon />
                    </IconButton>
                </Box>

                <Box style={rowStyle}>
                    <input
                        placeholder="by Song Year"
                        value={filters.songYear}
                        onChange={(e) => handleChange("songYear", e.target.value)}
                        style={inputStyle}
                    />
                    <IconButton onClick={() => handleClearField("songYear")}>
                        <ClearIcon />
                    </IconButton>
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    maxWidth: "600px"
                }}
            >
                <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{
                        background: "#1e88e5",
                        paddingX: 4,
                        paddingY: 1.4,
                        borderRadius: "30px",
                        fontSize: "16px",
                        textTransform: "none"
                    }}
                >
                    <SearchIcon sx={{ marginRight: "8px" }} /> Search
                </Button>

                <Button
                    variant="contained"
                    onClick={handleClearAll}
                    sx={{
                        background: "#1e88e5",
                        paddingX: 4,
                        paddingY: 1.4,
                        borderRadius: "30px",
                        fontSize: "16px",
                        textTransform: "none"
                    }}
                >
                    Clear
                </Button>
            </Box>
        </Box>
    );
}
