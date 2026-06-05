import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';

const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      throw new ApiError(401, 'Not authorized, no token');
    }

    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ApiError(401, 'User not found');
    }

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof ApiError) return next(err);
    next(new ApiError(401, 'Not authorized, token invalid'));
  }
};

export default auth;
