const express = require('express');
const router = express.Router();
const authGuard = require('../middleware/authGuard');

const {
    getFeed, createPost, toggleLike, addComment, deletePost
} = require('../controllers/postController');

router.get('/', getFeed);
router.post('/', authGuard, createPost);
router.delete('/:id', authGuard, deletePost);
router.post('/:id/like', authGuard, toggleLike);
router.post('/:id/comments', authGuard, addComment);

module.exports = router;
