import {Enums} from './Enums';

export interface Coin {
  id: string;
  name: string;
  pictureURL: string;
  type: Enums.CoinType;
  valueCount: number;
  price: number;
}
