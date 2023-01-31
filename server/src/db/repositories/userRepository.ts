import { IUser } from '../../core/types';
import { UserModel } from '../models/userModel';


export const addUser = async (userPayload: Partial<IUser>): Promise<IUser> => {
  const inserted = await UserModel.collection.insertOne(userPayload);

  return UserModel.findById(inserted.insertedId)
};

export const getUser = (username: string, password: string) => {
  return UserModel.findOne({ username, password });
}

export const getUserById = (id: string) => {
  return UserModel.findById(id);
}

export const getUsers = () => {
  return UserModel.find({}, {password: 0});
}