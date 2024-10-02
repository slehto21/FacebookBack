import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../config/jwt.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ ...req.body, password: hashedPassword });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the user is authorized to delete the user
        if (req.user.id !== parseInt(id)) {
            return res.status(403).json({ message: "You are not authorized to delete this user" });
        }

        await User.destroy({ where: { id } });
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.user.id !== parseInt(id)) {
            return res.status(403).json({ message: "You are not authorized to update this user" });
        }

        const { password, ...updatedFields } = req.body;
        await User.update(updatedFields, {
            where: { id },
            fields: Object.keys(updatedFields)
        });
        res.status(200).json({ message: "User updated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUserPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.update({ password: hashedPassword }, { where: { id } });
        res.status(200).json({ message: "Password updated" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

