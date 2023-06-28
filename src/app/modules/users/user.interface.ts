/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model, Types } from 'mongoose';

import { IStudent } from '../student/student.interface';
import { IFaculty } from '../faculty/faculty.interface';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  passwordChangeAt: Date;
  needChangePass: true | false;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};

export interface UserModel extends Model<IUser> {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'password' | 'needChangePass' | 'role'> | null>;
  isPasswordMatched(
    currentPass: string,
    savedPassword: string
  ): Promise<boolean>;
}
