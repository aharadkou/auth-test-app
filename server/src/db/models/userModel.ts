import { model, Schema } from 'mongoose';
import { IUser, UserRole } from '../../core/types';

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    minlength: 5,
  },
  //TODO: don't store password as string
  password: {
    type: String,
    minlength: 8,
  },
  role: {
    type: String,
    enum: UserRole
  },
});
  
UserSchema.virtual('id').get(function(){
  return this._id.toHexString();
});
  
UserSchema.set('toJSON', {
  virtuals: true
});
  
export const UserModel = model('UserModel', UserSchema);