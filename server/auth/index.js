const jwt = require("jsonwebtoken")

function authManager() {
    allowGuest = (req, res, next) => {
        try {
            const token = req.cookies.token;
            
            // If there's no token, they are a guest.
            if (!token) {
                req.userId = null;
                return next();
            }

            // If there is a token, verify it.
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = verified.userId;
            
            next();
        } catch (err) {
            // If the token is invalid/expired, treat them as a guest.
            req.userId = null;
            next();
        }
    }

    verify = (req, res, next) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({
                    loggedIn: false,
                    user: null,
                    errorMessage: "Unauthorized"
                })
            }

            const verified = jwt.verify(token, process.env.JWT_SECRET)
            console.log("verified.userId: " + verified.userId);
            req.userId = verified.userId;

            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({
                loggedIn: false,
                user: null,
                errorMessage: "Unauthorized"
            });
        }
    }

    verifyUser = (req) => {
        try {
            const token = req.cookies.token;
            if (!token) {
                return null;
            }

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            return decodedToken.userId;
        } catch (err) {
            return null;
        }
    }

    signToken = (userId) => {
        return jwt.sign({
            userId: userId
        }, process.env.JWT_SECRET);
    }

    return this;
}

const auth = authManager();
module.exports = auth;