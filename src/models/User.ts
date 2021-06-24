import {Coordinates} from './Coordinates';

export interface User {
  id: string;
  name: string;
  pictureURL: string;
  currency: string;
  location: Coordinates;
}
