import { Router } from 'express';
import authService from '../services/authService.js';
import { isAuth} from '../middlewares/authMiddleware.js';
import { errorHandler } from '../utils/errorHandler.js';

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register');
});

authController.post('/register', async (req, res) => {
    const userData = req.body;

    try {
        await authService.register(userData);
    } catch (err) {
        const error = errorHandler(err);
        return res.render('auth/register', { error });
    }

    res.redirect('/auth/login');
});

authController.get('/login', (req, res) => {
    res.render('auth/login');
});

authController.post('/login', async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.login(userData);

        res.cookie('auth', token, { httpOnly: true });
        res.redirect('/');

    } catch (err) {
        return res.render('auth/login', { error: errorHandler(err) });
    }
});

authController.get('/logout', isAuth, (req, res) => {

    res.clearCookie('auth');
    res.redirect('/');
});

export default authController;