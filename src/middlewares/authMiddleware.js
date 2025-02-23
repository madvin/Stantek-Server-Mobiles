import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'somesecret';
const COOKIE = 'auth';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies(COOKIE);

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jwt.verify(token, SECRET);

        req.user = decodedToken;
        res.locals.user = decodedToken;

        next();
    } catch (err) {
        res.setError('Invalid Authentication!');
        res.clearCookie(COOKIE);
        res.redirect('/auth/login');
    }
};

export const isAuth = (req, res, next) => {
    if (!req.user) {
        res.setError('You must be logged in to access this page!');
        return res.redirect('/auth/login');
    }
    next();
}