import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

import {Subscription} from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit, OnDestroy {
  private userSub: Subscription;
  private userId: string;

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.userSub = this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.userId = user.uid;
      } else {
        this.userId = null;
      }
    });

    setTimeout(() => {
      if (this.userId) {
        this.router.navigateByUrl('tabs');
      } else {
        this.router.navigateByUrl('login');
      }
    }, 2000);
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
