import {User} from './User';
import {Message} from './Message';

export interface Discussion {
  id: string;
  postId: string;
  postTitle: string;
  user1: User;
  user2: User;
  lastMessage: Message;
  read: boolean;
}
