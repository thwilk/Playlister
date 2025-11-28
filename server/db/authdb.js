const User  = require('../models/user-schema');
const bcrypt = require('bcryptjs');

const findUserById = async (id) => {
    return await User.findByPk(id);
};

const findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

const createUser = async ({ userName, profilePicture, email, password }) => {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const profileAvatar = profilePicture;
    const newUser = await User.create({ userName, email, profileAvatar, passwordHash });
    return newUser;
};

const verifyPassword = async (user, password) => {
    return await bcrypt.compare(password, user.passwordHash);
};

const updateUser = async (userId, newUserName, profilePicture, newPassword) => {
    try {
        const user = await findUserById(userId);
        if (!user) throw new Error("user nto found");

        if(newPassword){
            const salt = await bcrypt.genSalt(10);
            const newpasswordHash = await bcrypt.hash(newPassword, salt);
            user.passwordHash = newpasswordHash;
        }
        if(profilePicture){
            const stringPicture = profilePicture; // STRINGIFY UTIL TODO
            user.profileAvatar = stringPicture;
        }

        user.userName = newUserName || user.userName;
        await user.save();

        return user;
    }
    catch (err) {
        throw err; 
    }
}

module.exports = {
    findUserById,
    findUserByEmail,
    createUser,
    verifyPassword,
    updateUser
};
