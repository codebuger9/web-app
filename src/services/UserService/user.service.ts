import { Injectable } from '@angular/core';

import { User } from 'src/data/User';
import { Dictionary } from 'src/data/Helpers/Dictionary';
import { Randomizer } from 'src/data/Helpers/Randomizer';
import { Shuffler } from 'src/data/Helpers/Shuffler';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  mainUser: User;
  usersDictionary = new Dictionary<User>();

  constructor() {
    this.initialiseMainUser();
    this.initialiseUsers();
  }

  initialiseMainUser() {
    this.mainUser = new User(
      'Hazel Swanson',
      'assets/images/users/main-user.png',
      'https://res.cloudinary.com/cediim8/image/upload/v1555645862/ionInsta/main-user.png'
    );
  }

  initialiseUsers() {
    const user1 = new User(
      'Maisy Ware',
      'assets/images/users/user 1.png',
      'https://res.cloudinary.com/cediim8/image/upload/v1555645293/ionInsta/user_1.png'
    );
    this.usersDictionary.Add(user1.id, user1);

    const user2 = new User(
      'Tara Lambert',
      'assets/images/users/user 2.png',
      'https://res.cloudinary.com/cediim8/image/upload/v1555645294/ionInsta/user_2.png'
    );
    this.usersDictionary.Add(user2.id, user2);

    const user3 = new User(
      'Justin Barrett',
      'assets/images/users/user 3.png',
      'https://res.cloudinary.com/cediim8/image/upload/v1555645291/ionInsta/user_3.png'
    );
    this.usersDictionary.Add(user3.id, user3);

    const user4 = new User(
      'Crystal Huffman',
      'assets/images/users/user 4.png',
      'https://res.cloudinary.com/cediim8/image/upload/v1555645294/ionInsta/user_4.png'
    );
    this.usersDictionary.Add(user4.id, user4);

    const user5 = new User(
      'Kyle Fuentes',
      'assets/images/users/user 5.png',
      'https://res.cloudinary.com/cediim8/image/upload/v1555645289/ionInsta/user_5.png'
    );
    this.usersDictionary.Add(user5.id, user5);

    const user6 = new User(
      'Casey Webb',
      'assets/images/users/user 6.png',
      'https://res.cloudinary.com/cediim8/image/upload/v1555645293/ionInsta/user_6.png'
    );
    this.usersDictionary.Add(user6.id, user6);

    const user7 = new User(
      'Xander Kent',
      'assets/images/users/user 7.png',
      'https://res.cloudinary.com/cediim8/image/upload/v1555645290/ionInsta/user_7.png'
    );
    this.usersDictionary.Add(user7.id, user7);

    const user8 = new User(
      'Annabel James',
      'assets/images/users/user 8.png',
      'https://res.cloudinary.com/cediim8/image/upload/v1555645287/ionInsta/user_8.png'
    );
    this.usersDictionary.Add(user8.id, user8);

    const user9 = new User(
      'Katy Lozano',
      'assets/images/users/user 9.png',
      'https://res.cloudinary.com/cediim8/image/upload/v1555645294/ionInsta/user_9.png'
    );
    this.usersDictionary.Add(user9.id, user9);

    const user10 = new User(
      'Owen Cooper',
      'assets/images/users/user 10.png',
      'https://res.cloudinary.com/cediim8/image/upload/v1555645287/ionInsta/user_10.png'
    );
    this.usersDictionary.Add(user10.id, user10);
  }

  getUser(userId: string): User {
    return this.usersDictionary.Item(userId);
  }

  getUsers(): User[] {
    return Shuffler.shuffle(this.usersDictionary.Values().slice());
  }

  getRandomUsers(userCount: number): User[] {
    return Shuffler.shuffle(this.usersDictionary.Values().slice()).splice(
      0,
      userCount
    );
  }

  getRandomUser(): User {
    return this.usersDictionary.Values().slice()[
      Randomizer.randomIntFromInterval(0, 9)
    ];
  }
}
