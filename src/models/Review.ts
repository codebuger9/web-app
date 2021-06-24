import {User} from './User';

export interface Review {
  id: string;
  user: User;
  content: string;
  dateCreated: any;
}
