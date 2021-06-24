import {Injectable} from '@angular/core';

import {User} from 'src/models/User';

@Injectable({
  providedIn: 'root',
})
export class UserNavigatorService {
  private user: User;

  constructor() {}

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }
}
