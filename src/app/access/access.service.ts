import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// Classes e interfaces
import { User } from './user.model';
// Firebase
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Injectable()
export class AccessService {
  tokenJwt: string = null;

  constructor(private router: Router) { }

  registerUser(user: User): Promise<any> {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(response => {
        // Remoção da senha antes se registrar o usuário
        delete user.password;
        // O email deve ser mandado criptografado pois o firebase nao aceita caracteres especiais
        firebase.database().ref(`user_detail/${btoa(user.email)}`)
          .set(user)
      })
      .catch((error: Error) => {
        console.log(error);
      })
  }

  login(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        firebase.auth().currentUser.getIdToken()
          .then((token: string) => {
            if (token) {
              this.tokenJwt = token;
              localStorage.setItem('token', token);
              this.router.navigate(['/home']);
            }
          })
      })
      .catch((error: Error) => console.log(error))
  }

  auth(): boolean {
    if (!this.tokenJwt && localStorage.getItem('token') !== null) {
      this.tokenJwt = localStorage.getItem('token');
    }

    if(!this.tokenJwt){
      this.router.navigate(['/']);
    }

    return this.tokenJwt ? true : false;
  }

  logout() {
    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem('token');
        this.tokenJwt = null;
      });
  }
}