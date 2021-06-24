import {Enums} from './Enums';

import {User} from './User';
import {Shop} from './Shop';
import {Range} from './Range';
import {Offer} from './Offer';

export interface Post {
  id: string;
  user: User;
  shop: Shop;
  pictureURLs: string[];
  title: string;
  description: string;
  priceRange: Range;
  type: Enums.PostType;
  dateCreated: any;
  likesCount: number;
  offersCount: number;
  discussionsCount: number;
  isPublished: boolean;
  lastOffer: Offer;
}
