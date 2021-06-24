import { Randomizer } from './Randomizer';

export class LoremIpsumGenerator {
  static maxCharacters = 626;

  constructor() {}

  static loremIpsum =
    // tslint:disable-next-line:max-line-length
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pretium tortor mauris, ut mollis ex iaculis quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque sodales turpis tincidunt, feugiat risus volutpat, maximus augue. Pellentesque quis scelerisque ipsum, sit amet semper dui. Ut at malesuada dolor, ut placerat ligula. Fusce eros purus, tincidunt a est sit amet, scelerisque blandit erat. Sed sem nunc, lobortis id ante a, aliquam luctus magna. Fusce efficitur odio id convallis iaculis. Cras a ultrices orci, eget imperdiet lorem. Duis ultricies commodo ex, eget auctor dui viverra in.';

  static getText(start: number, end: number) {
    return this.loremIpsum.substring(start, end);
  }
}
