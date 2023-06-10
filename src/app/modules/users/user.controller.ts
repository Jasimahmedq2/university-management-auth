import { NextFunction, Request, Response } from 'express';
import usersService from './user.service';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body;
    console.log('hello jasim----------');
    const result = await usersService.createUser(user);
    res.status(200).json({
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  } catch (err) {
    next();
  }
};

export default {
  createUser,
};