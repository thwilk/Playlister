const authdb = require('../db/authdb');

const formatPlaylist = async (playlist) => {
    if (!playlist) return null;


    const userData = await authdb.getUserInfo(playlist.userId);

    return {
        _id: playlist._id || playlist.id,         
        name: playlist.name,
        songs: playlist.songs || [],
        userId: playlist.userId || playlist.ownerEmail || null,
        userAvatar: userData.profileAvatar,
        userName: userData.userName
    };
};

const response = {
    success: (data = {}) => ({
        success: true,
        ...data
    }),
    error: (message, extra = {}) => ({
        success: false,
        errorMessage: message,
        ...extra
    })
};

module.exports = {
    formatPlaylist,
    response
};
