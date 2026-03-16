const jwt = require('jsonwebtoken');

const authGuard = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    
    if (!token) return res.status(401).json({ error: 'Token bulunamadi' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super-secret-key');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Gecersiz token' });
    }
};

module.exports = authGuard;
