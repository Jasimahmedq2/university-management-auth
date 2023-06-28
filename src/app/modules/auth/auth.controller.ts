import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { authService } from './auth.service';
import config from '../../../config';

const login = catchAsync(async (req: Request, res: Response) => {
  const { ...loginInfo } = req.body;
  const result = await authService.login(loginInfo);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully login',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'the refresh token is valid',
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  console.log(req.user);
  const user = req.user;
  const { ...passwordData } = req.body;
  const result = await authService.changePassword(user, passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully changed password',
    data: result,
  });
});

export const authController = {
  login,
  refreshToken,
  changePassword,
};
