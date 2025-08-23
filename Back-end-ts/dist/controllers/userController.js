"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUser = exports.getUsers = void 0;
const client_1 = require("../prisma/client");
const getUsers = async (_req, res) => {
    try {
        const users = await client_1.prisma.user.findMany({
            include: { posts: true }
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await client_1.prisma.user.findUnique({
            where: { id: Number(id) },
            include: { posts: true }
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};
exports.getUser = getUser;
const createUser = async (req, res) => {
    const { email, name } = req.body;
    try {
        const user = await client_1.prisma.user.create({
            data: { email, name }
        });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};
exports.createUser = createUser;
//# sourceMappingURL=userController.js.map