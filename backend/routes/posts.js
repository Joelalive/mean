const express = require('express');

const router = express.Router();

const Post = require('../models/post');


router.get('', (req, res, next) => {
   
    Post.find()
    .then((documents) => {
        res.status(200).json({
            message: 'posts fetched successfully.',
            posts: documents
        });
    });
});

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then(
        (post) => {
            if(post) {
            res.status(200).json(post);
            } else {
                res.status(200).json({
                  message: 'post not found'
                });
            }
        }
    );
});

router.post('', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post)
    .then((respData) => {
        console.log(respData);
        res.status(200).json({message: 'post updated successfully.'});
    })
});


router.delete('/:id', (req, res, next) => {
    Post.deleteOne({ _id: req.params.id}).then((result) => {
        console.log(result);
        res.status(200).json({
            message: 'Post deleted successfully.'
        });
    })
});


module.exports = router;