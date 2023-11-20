import express from 'express';

import connect from './config/database.js';
import apiRoutes from './routes/index.js';
import passport from 'passport'

import { passportAuth } from './config/passport.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(passport.initialize());
passportAuth(passport);

app.use('/api', apiRoutes);


app.listen(4000, async () => {
    console.log(`Server started at 4000`);
    await connect();
    console.log("Database connected");
    
})
