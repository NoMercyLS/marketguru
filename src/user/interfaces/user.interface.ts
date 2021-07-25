export interface IUser {
  id?: string;
  email?: string;
  login?: string;
  password: string;
  name: string;
  surname: string;
  birthdate?: string;
  created_at?: Date;
  updated_at?: Date;
}