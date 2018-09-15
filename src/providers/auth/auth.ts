import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../../models/user";

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from "angularfire2/database";

import firebase from "firebase/app";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private user: firebase.User;

  constructor(
    public http: HttpClient,
    private auth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    auth.authState.subscribe(usr => {
      this.user = usr;
    });
  }

login = (email, pass)=> {
return this.auth.auth.signInWithEmailAndPassword(email, pass);
}

signUp(email, pass): Promise<any> {
  return this.auth.auth.createUserWithEmailAndPassword(email, pass);
}

createUser = (uid, email, username) => {
  let newUser = {
    uid: uid,
    username: username,
    email: email,
  } as User;
  console.log(uid, email, username);
  this.auth.authState.take(1).subscribe(auth => {
    this.db.object<User>(`/users/${uid}`).set(newUser);
    this.db.object(`/usernames/${username}`).set({ uid: uid });
  });
}




}
