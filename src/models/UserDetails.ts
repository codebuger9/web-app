import {Enums} from './Enums';
import {User} from './User';
import {Shop} from './Shop';
import {Mall} from './Mall';
import {PackInfo} from './PackInfo';
import {Card} from './Card';

export interface UserDetails extends User {
  userName: string;
  email: string;
  shop: Shop;
  mall: Mall;
  pack: PackInfo;
  card: Card;
  postsCount: number;
  coinsCount: number;
  permissionLevel: Enums.PermissionLevel;
}
