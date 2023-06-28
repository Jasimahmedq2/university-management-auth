/* eslint-disable @typescript-eslint/no-unused-vars */
import config from '../../../config';
import ApiError from '../../../errors/apiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../users/user.model';
import {
  ILoginInfo,
  ILoginResponse,
  IPasswordChange,
  IRefreshResponseToken,
} from './auth.interface';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { date } from 'zod';

const login = async (payload: ILoginInfo): Promise<ILoginResponse> => {
  const { id, password } = payload;

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(404, "user doesn't exist");
  }

  if (!(await User.isPasswordMatched(password, isUserExist.password))) {
    throw new ApiError(400, "password doesn't matched");
  }

  const { id: userId, role, needChangePass } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.secret_expireIn as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expireIn as string
  );

  return {
    accessToken,
    refreshToken,
    needChangePass,
  };
};

const refreshToken = async (token: string): Promise<IRefreshResponseToken> => {
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(400, 'invalid refresh token');
  }

  const { userId } = verifiedToken;

  const isUserExist = User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(404, "user doesn't exist");
  }

  const newAccessToken = jwtHelpers.createToken(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt.secret as Secret,
    config.jwt.secret_expireIn as string
  );
  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IPasswordChange
) => {
  const { oldPassword, newPassword } = payload;

  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );
  console.log(isUserExist);

  if (!isUserExist) {
    throw new ApiError(404, "user doesn't exist");
  }

  if (!(await User.isPasswordMatched(oldPassword, isUserExist.password))) {
    throw new ApiError(400, "password doesn't matched");
  }

  isUserExist.needChangePass = false;
  isUserExist.password = newPassword;

  isUserExist.save();

  // const hashNewPassword = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bcrypt_hash_sold)
  // );

  // const updatedData = {
  //   password: hashNewPassword,
  //   needChangePass: false,
  //   passwordChangeAt: new Date(),
  // };

  // const updatedResult = await User.findOneAndUpdate(
  //   { id: user?.userId },
  //   updatedData
  // );

  // return {
  //   updatedResult,
  // };
};

export const authService = {
  login,
  refreshToken,
  changePassword,
};
