import {User} from './User';

export interface Comment {
  id: string;
  postId: string;
  postUserId: string;
  postPictureURL: string;
  user: User;
  content: string;
  dateCreated: any;
}
