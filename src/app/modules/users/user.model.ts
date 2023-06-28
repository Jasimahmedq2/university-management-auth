/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    passwordChangeAt: Date,
    needChangePass: {
      type: Boolean,
      default: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isUserExist = async function (
  id: string
): Promise<Pick<IUser, 'id' | 'password' | 'needChangePass' | 'role'> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, needChangePass: 1, role: 1 }
  );
};

userSchema.statics.isPasswordMatched = async function (
  currentPass: string,
  savedPassword: string
): Promise<boolean> {
  return bcrypt.compare(currentPass, savedPassword);
};

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_hash_sold)
  );

  if (!user.needChangePass) {
    user.passwordChangeAt = new Date();
  }
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
