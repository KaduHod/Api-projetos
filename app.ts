import express from 'express';
import Routes from './app/http/routes';
require('dotenv').config({path: '.env'});
import MongoDB from './app/database/MongoDB';
import ConnectionParams from './app/interfaces/ConnectionParams';

const app = express();
const {PORT, URL_DEV, URL_PROD, DB_PASSWORD, DB_USER, DB_NAME} = process.env;
app.use(Routes);



app.listen(PORT, ()=>{
    console.log(`running at ${URL_DEV}${PORT}`)
});

