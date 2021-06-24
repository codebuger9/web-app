import { Randomizer } from './Helpers/Randomizer';
import { GuidGenerator } from './Helpers/GuidGenerator';
import { LoremIpsumGenerator } from './Helpers/LoremIpsumGenerator';

export class User {
  constructor(name: string, pictureUrl: string, externalPictureUrl: string) {
    this.name = name;
    this.description = LoremIpsumGenerator.getText(
      0,
      Randomizer.randomIntFromInterval(20, 200)
    );
    this.alias =
      name.replace(/\s+/g, '_').toLowerCase() +
      '_' +
      Randomizer.randomIntFromInterval(1, 9) +
      Randomizer.randomIntFromInterval(1, 9) +
      Randomizer.randomIntFromInterval(1, 9);
    this.pictureUrl = pictureUrl;
    this.externalPictureUrl = externalPictureUrl;

    this.id = GuidGenerator.guid();
    this.isSelected = false;
    this.followersCount = Randomizer.randomIntFromInterval(100, 999);
    this.followingCount = Randomizer.randomIntFromInterval(100, 999);
    this.isFollowing = Randomizer.randomIntFromInterval(0, 2) === 0;
  }

  id: string;
  name: string;
  description: string;
  alias: string;
  pictureUrl: string;
  externalPictureUrl: string;
  followersCount: number;
  followingCount: number;
  isSelected: boolean;
  isFollowing: boolean;
}
