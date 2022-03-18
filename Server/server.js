const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');

const routerTutorials = require( './routes/tutorials.routes' );
const db  = require('./models');
const env = require('./config/env');
const path = require("path");
/*********************************************** */

const app = express();

//app.use(cors({ origin: env.ORIGIN }));

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

app.use(cors({ origin: process.env.ORIGIN }));
app.use( bodyParser.json());
app.use( bodyParser.urlencoded({ extended: false }) );
app.use( '/api/tutorials', routerTutorials );

const PORT = process.env.PORT || env.PORT;

app.listen( PORT, () => {
    console.log( `Application is running on http://localhost:${PORT}` );
})