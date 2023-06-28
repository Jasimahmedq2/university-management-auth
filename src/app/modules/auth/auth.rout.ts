import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { authValidationSchema } from './auth.validation';
import { authController } from './auth.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post(
  '/login',
  validateRequest(authValidationSchema.loginZodSchema),
  authController.login
);

router.post(
  '/refresh-token',
  validateRequest(authValidationSchema.refreshTokenZodSchema),
  authController.refreshToken
);
router.post(
  '/change-password',
  validateRequest(authValidationSchema.changePasswordZodSchema),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.STUDENT
  ),
  authController.changePassword
);

export const authRouter = router;
