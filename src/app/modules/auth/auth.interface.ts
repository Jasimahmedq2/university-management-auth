export type ILoginInfo = {
  id: string;
  password: string;
};

export type ILoginResponse = {
  refreshToken: string;
  needChangePass: boolean;
};

export type IRefreshResponseToken = {
  accessToken: string;
};

export type IPasswordChange = {
  oldPassword: string;
  newPassword: string;
};
