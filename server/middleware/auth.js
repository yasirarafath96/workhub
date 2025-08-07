import jwt from 'jsonwebtoken';

const jwtSecret = "00000000";

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            console.log('JWT verify error:', err);
            return res.status(403).json({ message: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
}
