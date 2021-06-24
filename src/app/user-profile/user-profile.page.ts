import {Component, OnInit} from '@angular/core';

import {UserNavigatorService} from 'src/services/UserNavigatorService/userNavigator.service';

import {User} from 'src/models/User';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  public type: string = 'reviews';
  public postsDisplayType: string = 'list';

  public user: User;

  constructor(private userNavigatorService: UserNavigatorService) {}

  ngOnInit() {
    this.user = this.userNavigatorService.getUser();
  }
}
