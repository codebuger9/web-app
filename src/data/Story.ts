import { GuidGenerator } from './Helpers/GuidGenerator';

export class Story {
  constructor(userName: string, userAvatar: string, pictureUrls: string[]) {
    this.id = GuidGenerator.guid();

    this.userName = userName;
    this.userAvatar = userAvatar;
    this.pictureUrls = pictureUrls;
  }

  id: string;
  userName: string;
  userAvatar: string;
  pictureUrls: string[] = [];
}
