const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) return res.status(400).json({ error: 'Bu email zaten kayitli' });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
        
        res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ error: 'Kullanici bulunamadi' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Hatali sifre' });

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
        
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, name: true, email: true, avatarUrl: true, bio: true }
        });
        
        if (!user) return res.status(404).json({ error: 'Kullanici bulunamadi' });
        
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
