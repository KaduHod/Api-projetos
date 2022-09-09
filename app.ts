import express from 'express';
import Routes from './app/http/routes';
require('dotenv').config({path: '.env'});
const app = express();
const {PORT, URL_DEV} = process.env;
app.use(Routes);
app.listen(PORT || 9999, ()=>{
    console.log(`running at ${URL_DEV}${PORT}`)
});

