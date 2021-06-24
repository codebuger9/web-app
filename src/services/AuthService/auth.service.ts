import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

import * as firebase from 'firebase';

import {FirestoreService} from '../FirestoreService/firestore.service';

import {UserDetails} from 'src/models/UserDetails';
import {LoginInfo} from 'src/models/LoginInfo';
import {SignupInfo} from 'src/models/SignupInfo';

@Injectable()
export class AuthService {
  public user: UserDetails;

  constructor(
    private afAuth: AngularFireAuth,
    private firestoreService: FirestoreService
  ) {}

  async registerUser(signupInfo: SignupInfo) {
    return new Promise((resolve, reject) => {
      this.getLocation().then(
        (location) => {
          this.afAuth
            .createUserWithEmailAndPassword(
              signupInfo.email,
              signupInfo.password
            )
            .then(
              (result) => {
                var user = <UserDetails>{
                  id: result.user.uid,
                  name: signupInfo.name,
                  userName: signupInfo.userName,
                  email: signupInfo.email,
                  pictureURL: '',
                  shop: {},
                  currency: 'USD', // default currency
                  pack: {},
                  card: {},
                  postsCount: 0,
                  coinsCount: 0,
                  location: location,
                };

                this.firestoreService.addUser(user).then(
                  () => {
                    resolve();
                  },
                  (error) => {
                    console.error(error);
                    reject(error);
                  }
                );
              },
              (error) => {
                console.error(error);
                reject(error);
              }
            );
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  }

  async signIn(loginInfo: LoginInfo) {
    try {
      await this.afAuth.signInWithEmailAndPassword(
        loginInfo.email,
        loginInfo.password
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async signOut() {
    await firebase.auth().signOut();
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            var location = <Coordinates>{
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };

            resolve(location);
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          {timeout: 30000}
        );
      } else {
        // Browser doesn't support Geolocation
        console.error("Browser doesn't support Geolocation");
        reject("Browser doesn't support Geolocation");
      }
    });
  }
}
