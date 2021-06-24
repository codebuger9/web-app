import { Component, OnInit } from '@angular/core';

import 'zuck.js/zuck.js';
declare var Zuck;

import { UserService } from 'src/services/UserService/user.service';

import { Story } from 'src/data/Story';
import { Randomizer } from 'src/data/Helpers/Randomizer';

@Component({
  selector: 'stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  stories: Story[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.initialiseStories();
  }

  initialiseStories() {
    const users = this.userService.getUsers();

    for (let i = 0; i < users.length; i++) {
      const pictureUrls = [];

      for (let j = 0; j < Randomizer.randomIntFromInterval(1, 3); j++) {
        pictureUrls.push(
          'assets/images/stories/story ' +
            Randomizer.randomIntFromInterval(1, 20) +
            '.jpg'
        );
      }

      this.stories.push(
        new Story(users[i].name, users[i].externalPictureUrl, pictureUrls)
      );
    }

    console.log(this.stories);

    // tslint:disable-next-line:no-unused-expression
    new Zuck('stories', {
      backNative: true,
      autoFullScreen: 'false',
      skin: 'Snapgram',
      avatars: 'true',
      list: false,
      cubeEffect: 'true',
      localStorage: true,
      stories: this.createStoryItems()
    });
  }

  createStoryItems() {
    const storyItems = [];

    this.stories.forEach((story: Story) => {
      storyItems.push(this.createStoryItem(story));
    });

    return storyItems;
  }

  createStoryItem(story: Story) {
    const storyPictures = [];

    for (let i = 1; i <= story.pictureUrls.length; i++) {
      storyPictures.push(
        this.createStoryPicture(
          i.toString(),
          'photo',
          3,
          story.pictureUrls[i - 1],
          '',
          '',
          false,
          new Date().getTime() / 1000
        )
      );
    }

    return {
      id: story.id,
      photo: story.userAvatar,
      name: story.userName,
      link: '',
      lastUpdated: new Date().getTime() / 1000,
      items: storyPictures
    };
  }

  createStoryPicture(
    id: string,
    type: string,
    length: number,
    src: string,
    preview: string,
    link: string,
    seen: boolean,
    time: number
  ) {
    return {
      id: id,
      type: type,
      length: length,
      src: src,
      preview: preview,
      link: link,
      seen: seen,
      time: time
    };
  }
}
