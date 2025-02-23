import { Router } from 'express';
import { getErrorMessage } from '../utils/errorHandler.js';
import mobileService from '../services/mobileService.js';
import { dateMiddleware } from '../middlewares/dateMiddleware.js';
import { mobileMiddleware } from '../middlewares/mobileMiddleware.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const mobileController = Router();

