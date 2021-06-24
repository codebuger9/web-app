import {User} from './User';

export interface Message {
  id: string;
  user: User;
  content: string;
  dateCreated: any;
}
