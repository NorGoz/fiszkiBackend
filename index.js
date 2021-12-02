const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const {clientRouter} = require("./routers/word");
const {homeRouter} = require("./routers/home");


const app = express();

app.use(methodOverride('_method'));
app.use(cors());
app.use(express.json());
app.use('/', homeRouter)
app.use('/words', clientRouter);

app.listen(5000,'0.0.0.0',() => {
    console.log('listening on http://localhost:5000')})