import {type IUser} from './user.interface.js';

export interface IProduct {
  id : number;
  name : string;
  desc : string;
  quantity : number
  created_by : number
}

export interface IProductWithUser extends IProduct {
    user: Omit<IUser, 'password'>;
}