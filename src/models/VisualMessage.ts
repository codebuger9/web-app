import {Message} from './Message';

export interface VisualMessage extends Message {
  timeAgo: string;
  isCurrentUser: boolean;
  read: boolean;
  delivered: boolean;
  sent: boolean;
}
