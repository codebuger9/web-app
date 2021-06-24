import { Injectable, Inject, forwardRef } from '@angular/core';

import { UserService } from 'src/services/UserService/user.service';
import { PostsService } from 'src/services/PostsService/posts.service';

import { Notification } from 'src/data/Notification';
import { Randomizer } from 'src/data/Helpers/Randomizer';
import { Dictionary } from 'src/data/Helpers/Dictionary';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationsDictionary = new Dictionary<Notification>();

  todayNotifications: Notification[] = [];
  weeklyNotifications: Notification[] = [];
  monthlyNotifications: Notification[] = [];

  constructor(
    @Inject(forwardRef(() => UserService))
    public userService: UserService,
    @Inject(forwardRef(() => PostsService))
    public postsService: PostsService
  ) {
    this.initialiseNotifications();
  }

  initialiseNotifications() {
    // Today notifications
    const todayNotificationCount = Randomizer.randomIntFromInterval(1, 3);

    for (let i = 0; i < todayNotificationCount; i++) {
      const notification = new Notification(
        this.userService,
        this.postsService
      );

      this.todayNotifications.push(notification);
      this.notificationsDictionary.Add(notification.id, notification);
    }

    // Weekly notifications
    const weeklyNotificationCount = Randomizer.randomIntFromInterval(6, 10);

    for (let i = 0; i < weeklyNotificationCount; i++) {
      const notification = new Notification(
        this.userService,
        this.postsService
      );

      this.weeklyNotifications.push(notification);
      this.notificationsDictionary.Add(notification.id, notification);
    }

    // Monthly notifications
    const monthlyNotificationCount = Randomizer.randomIntFromInterval(10, 20);

    for (let i = 0; i < monthlyNotificationCount; i++) {
      const notification = new Notification(
        this.userService,
        this.postsService
      );

      this.monthlyNotifications.push(notification);
      this.notificationsDictionary.Add(notification.id, notification);
    }
  }

  getNotification(notificationId: string) {
    if (this.notificationsDictionary.ContainsKey(notificationId)) {
      return this.notificationsDictionary.Item(notificationId);
    }

    return null;
  }
}
