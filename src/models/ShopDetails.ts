import {Shop} from './Shop';
import {Mall} from './Mall';
import {User} from './User';
import {Enums} from './Enums';

export interface ShopDetails extends Shop {
  user: User;
  mall: Mall;
  description: string;
  companyName: string;
  address: string;
  employeesCount: number;
  businessType: Enums.BusinessType;
  shopType: Enums.ShopType;
  postsCount: number;
}
