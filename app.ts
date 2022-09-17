import express from 'express';
import Routes from './app/http/routes';
import {initialize} from './app/database/init'
import cors from 'cors';
require('dotenv').config({path: '.env'});
const app = express();
const {PORT, URL_DEV} = process.env;
const corsOptions = {
    origin:'http://localhost:5173'
}
app.use(cors(corsOptions))
app.use(Routes);
initialize().then(()=>{
    app.listen(PORT || 9999, ()=>{
        console.log(`running at ${URL_DEV}${PORT}`)
    });
}).catch( err => console.log('Error initializing database!', err) )


