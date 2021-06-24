import {Component, OnInit, OnDestroy} from '@angular/core';

import * as moment from 'moment';
import {Subscription} from 'rxjs';

import {AuthService} from 'src/services/AuthService/auth.service';
import {FirestoreService} from 'src/services/FirestoreService/firestore.service';

import {Notification} from 'src/models/Notification';
import {VisualNotification} from 'src/models/VisualNotification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit, OnDestroy {
  public todayNotifications: VisualNotification[] = [];
  public weeklyNotifications: VisualNotification[] = [];
  public monthlyNotifications: VisualNotification[] = [];
  public olderNotifications: VisualNotification[] = [];

  public notificationsLoaded: boolean = false;

  private today = moment().clone().startOf('day');
  private weekOld = moment().clone().subtract(7, 'days').startOf('day');
  private monthOld = moment().clone().subtract(31, 'days').startOf('day');

  private notificationsSub: Subscription;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.getNotifications();
  }

  ngOnDestroy() {
    if (this.notificationsSub) {
      this.notificationsSub.unsubscribe();
    }
  }

  getNotifications() {
    this.notificationsSub = this.firestoreService
      .getNotifications(this.authService.user.id)
      .subscribe((notifications: Notification[]) => {
        this.todayNotifications = [];
        this.weeklyNotifications = [];
        this.monthlyNotifications = [];
        this.olderNotifications = [];

        notifications.forEach((notification) => {
          var visualNotification = this.notificationToVisualNotification(
            notification
          );

          if (this.isToday(visualNotification)) {
            this.todayNotifications.push(visualNotification);
          } else if (this.isWeekOld(visualNotification)) {
            this.weeklyNotifications.push(visualNotification);
          } else if (this.isMonthOld(visualNotification)) {
            this.monthlyNotifications.push(visualNotification);
          } else {
            this.olderNotifications.push(visualNotification);
          }
        });

        this.notificationsLoaded = true;
      });
  }

  isToday(notification: VisualNotification) {
    return moment(notification.dateCreated.toDate()).isSame(this.today, 'd');
  }

  isWeekOld(notification: VisualNotification) {
    return (
      moment(notification.dateCreated.toDate()).isBefore(this.today, 'd') &&
      moment(notification.dateCreated.toDate()).isAfter(this.weekOld, 'd')
    );
  }

  isMonthOld(notification: VisualNotification) {
    return (
      moment(notification.dateCreated.toDate()).isBefore(this.weekOld, 'd') &&
      moment(notification.dateCreated.toDate()).isAfter(this.monthOld, 'd')
    );
  }

  notificationToVisualNotification(
    notification: Notification
  ): VisualNotification {
    var visualNotification = <VisualNotification>Object.assign(notification);

    visualNotification.timeAgo = notification.dateCreated
      ? moment(notification.dateCreated.toDate()).fromNow()
      : 'Just now';

    return visualNotification;
  }
}
