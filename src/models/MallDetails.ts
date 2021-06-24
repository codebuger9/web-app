import {Mall} from './Mall';
import {User} from './User';

export interface MallDetails extends Mall {
  shopsCount: number;
  owner: User;
}
