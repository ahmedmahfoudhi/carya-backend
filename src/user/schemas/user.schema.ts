import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, MinLength } from 'class-validator';
import mongoose, { Document, HydratedDocument, Types } from 'mongoose';
import { hashPassword } from 'src/shared/handle-password';
import { UserRolesEnum } from '../enums/user-role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;

  @Prop({ default: '' })
  phoneNumber: string;

  @Prop({ required: true })
  @MinLength(8)
  password: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ default: UserRolesEnum.USER })
  role: UserRolesEnum;
}

export const UserSchema = SchemaFactory.createForClass(User);

/**
 * hash password before saving a user in the DB
 */
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const hashedPassword = await hashPassword(this.password);
  this.password = hashedPassword;
  next();
});
