// import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
    // firebase.database().ref('/users/' + user.uid).update({
    //   name: user.displayName,
    //   email: user.email
    // });
  }

  get(uid: string): AngularFireObject<AppUser> {
    // return firebase.database().ref('/users/' + uid);
    return this.db.object('/users/' + uid);
  }
}
