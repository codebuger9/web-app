import {Post} from './Post';

export interface VisualPost extends Post {
  isLiked: boolean;
  isFavorite: boolean;
  pictureIndex: number;
  timeAgo: string;
  distance: number;
}
