import {Enums} from './Enums';
import {User} from './User';

export interface Notification {
  id: string;
  type: Enums.NotificationType;
  dateCreated: any;
  user: User;
  postId: string;
  postPictureURL: string;
  read: boolean;
}

export interface CommentNotification extends Notification {
  commentId: string;
  commentContent: string;
}

export interface OfferNotification extends Notification {
  offerId: string;
  offerValue: number;
}
