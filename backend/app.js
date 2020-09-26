const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

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
        'GET, POST, PATCH, DELETE, OPTIONS');
    next();
});

app.get('/api/posts', (req, res, next) => {
   
    Post.find()
    .then((documents) => {
        res.status(200).json({
            message: 'posts fetch successfully.',
            posts: documents
        });
    });
});

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then((createdPost) => {
        console.log(post);
        res.status(201).json({
            message:'post added successfully.',
            postId: createdPost._id
        });
    });
});


app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id}).then((result) => {
        console.log(result);
        res.status(200).json({
            message: 'Post deleted successfully.'
        });
    })
});


module.exports = app;