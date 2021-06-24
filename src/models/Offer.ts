import {User} from './User';

export interface Offer {
  id: string;
  postId: string;
  postUserId: string;
  postPictureURL: string;
  user: User;
  value: number;
  dateCreated: any;
}
