const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require('./routes/posts');

const app = express();

mongoose.connect("mongodb+srv://joel:34JmTN1dk8Dg72g2@cluster0.zhkav.mongodb.net/node-mean?retryWrites=true&w=majority", { useNewUrlParser: true , useUnifiedTopology: true})
.then(() => {
    console.log('Database Connected')
})
.catch(() => {
    console.log('Connection failed')
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api/posts', postsRoutes);

module.exports = app;