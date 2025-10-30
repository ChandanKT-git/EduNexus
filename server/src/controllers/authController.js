import jwt from 'jsonwebtoken';
import User from '../models/User.js';

function signToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password, role });
    const token = signToken(user);
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (e) {
    return res.status(500).json({ message: 'Registration failed' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = signToken(user);
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (e) {
    return res.status(500).json({ message: 'Login failed' });
  }
}

export async function me(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.json({ user });
  } catch (e) {
    return res.status(500).json({ message: 'Failed to fetch user' });
  }
}

export async function logout(req, res) {
  res.clearCookie('token');
  return res.json({ message: 'Logged out' });
}
