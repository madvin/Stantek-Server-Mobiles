import { Router } from 'express';
import { getErrorMessage } from '../utils/errorHandler.js';
import mobileService from '../services/mobileService.js';
import getToday  from '../middlewares/dateMiddleware.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const mobileController = Router();

mobileController.post('/create', getToday, isAuth, async (req, res) => {
    const { partNumber, country, value } = req.body;
    const today = req.today;

    if (!["Bulgaria", "Macedonia", "Serbia", "Romania", "Greece"].includes(country)) {
        return res.status(400).json({ error: "Invalid country" });
    }

    try {
        let dailyRecord = await mobileService.findDailyData(today);

        if (!dailyRecord) {
            dailyRecord = await mobileService.createDailyData(today, partNumber, country, value);
            return res.json({ message: "First contribution created", dailyRecord });
        }

        dailyRecord = await mobileService.updateDailyData(dailyRecord, partNumber, country, value);
        res.json({ message: "Contribution added", dailyRecord });
    } catch (error) {
        res.status(500).json({ err: getErrorMessage(err) });
    }
});

mobileController.get('/today', getToday, isAuth, async (req, res) => {
    const today = req.today;

    try {
        const dailyRecord = await mobileService.findDailyData(today);

        if (!dailyRecord) {
            return res.status(404).json({ err: "No record found for today" });
        }

        res.json(dailyRecord);
    } catch (err) {
        res.status(500).json({ err: getErrorMessage(err) });
    }
});

export default mobileController;
