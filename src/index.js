import express from 'express';
import handlebars from 'express-handlebars';
import expressSession from 'express-session';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import homeController from './controllers/homeController.js';
import 'dotenv/config';

import routes from './router.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

const app = express();

const port = process.env.PORT || 3030;
const URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/Stantek-mobiles';

try {
    await mongoose.connect(URI);
    console.log('Database is connected!');
} catch (err) {
    console.log('Database connection error!');
    console.error(err);
}

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));


app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use(homeController);
app.use('/static', express.static('src/public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    secret: 'laskjdlsakjdlaskjdlkasdjska123123easdas',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
    }
}));


app.use(authMiddleware);
app.use(routes);




app.listen(`${port}`, () => console.log(`Server is listening on port: http://localhost:${port}...`));
