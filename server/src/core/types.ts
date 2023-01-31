export interface IUser {
  id: string;
  username: string;
  password: string;
  role: UserRole;
};

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}