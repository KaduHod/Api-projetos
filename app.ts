import express from 'express';
import Routes from './app/http/routes';
import {initialize} from './app/database/init'

require('dotenv').config({path: '.env'});
const app = express();
const {PORT, URL_DEV} = process.env;
app.use(Routes);

initialize().then(()=>{
    app.listen(PORT || 9999, ()=>{
        console.log(`running at ${URL_DEV}${PORT}`)
    });
})


