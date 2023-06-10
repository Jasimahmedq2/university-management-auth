import express from 'express';
import usersController from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
const Router = express.Router();

Router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  usersController.createUser
);

export const UserRoutes = Router;
