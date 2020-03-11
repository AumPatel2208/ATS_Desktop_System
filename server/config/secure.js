const jwt = require('jsonwebtoken');

function secure(q,a,next) {
    const token = q.header('x-auth-token');

    if (!token) {
        return q.status(404).json({message: "authorisation denied"});
    }
    try {
        const decoded = jwt.verify(token, "figureoutwhattoputhere");

        q.user = decoded;
        next();
    } catch (e) {
        a.status(404).json({message: "invalid token"});
    }
}

module.exports = secure;