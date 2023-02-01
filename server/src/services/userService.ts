import { IUser } from '../core/types';
import * as userRepository from '../db/repositories/userRepository';

export const getUser = async (username: string, password: string): Promise<IUser> => {
  return userRepository.getUser(username, password);
};

export const getUserById = async (id: string): Promise<IUser> => {
  return userRepository.getUserById(id);
};

export const addUser = async (userPayload: Partial<IUser>): Promise<IUser> => {
  return userRepository.addUser(userPayload);
};

export const getUsers = (): Promise<IUser[]> => {
  return userRepository.getUsers() as unknown as Promise<IUser[]>;
};
