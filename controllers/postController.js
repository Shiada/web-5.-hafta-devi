const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/posts -- Feed
exports.getFeed = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                author: {
                    select: { id: true, name: true, avatarUrl: true }
                },
                comments: {
                    include: {
                        author: { select: { id: true, name: true } }
                    },
                    orderBy: { createdAt: 'asc' }
                },
                likes: { select: { userId: true } },
                _count: { select: { likes: true, comments: true } }
            }
        });
        res.json({ posts });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST /api/posts -- Yeni gonderi
exports.createPost = async (req, res) => {
    try {
        const { content, imageUrl } = req.body;
        if (!content || content.trim().length === 0) {
            return res.status(400).json({ error: 'Bos olamaz' });
        }

        const post = await prisma.post.create({
            data: { content, imageUrl, authorId: req.user.id },
            include: {
                author: {
                    select: { id: true, name: true, avatarUrl: true }
                },
                _count: { select: { likes: true, comments: true } }
            }
        });
        res.status(201).json({ post });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST /api/posts/:id/like -- Toggle
exports.toggleLike = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const userId = req.user.id;

        const existing = await prisma.like.findUnique({
            where: { userId_postId: { userId, postId } }
        });

        if (existing) {
            await prisma.like.delete({ where: { id: existing.id } });
            res.json({ liked: false });
        } else {
            await prisma.like.create({ data: { userId, postId } });
            res.json({ liked: true });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// POST /api/posts/:id/comments
exports.addComment = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const { text } = req.body;
        
        if (!text || text.trim().length === 0) {
            return res.status(400).json({ error: 'Bos olamaz' });
        }

        const comment = await prisma.comment.create({
            data: { text, authorId: req.user.id, postId },
            include: {
                author: { select: { id: true, name: true } }
            }
        });
        res.status(201).json({ comment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE /api/posts/:id
exports.deletePost = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return res.status(404).json({ error: 'Bulunamadi' });
        }

        if (post.authorId !== req.user.id) {
            return res.status(403).json({ error: 'Yetkiniz yok' });
        }

        await prisma.post.delete({ where: { id: postId } });
        res.json({ message: 'Silindi' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
