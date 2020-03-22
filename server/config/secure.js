const jwt = require('jsonwebtoken');
const config = require('./db');

function secure(q, a, next) {
    const token = q.header('x-auth-token');

    if (!token) {
        return a.status(401).json({ message: 'authorisation denied' });
    }
    try {
        const decoded = jwt.verify(token, config.get('jwt'));

        a.user = decoded;
        next();
    } catch (e) {
        a.status(404).json({ message: 'invalid token' });
    }
}

module.exports = secure;
