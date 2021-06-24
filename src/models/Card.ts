import {Enums} from './Enums';

export interface Card {
  id: string;
  pictureURL: string;
  isLocked: boolean;
  type: Enums.CardType;
}
