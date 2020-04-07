import { Injectable } from '@angular/core';
// Firebase
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  createPost({ email, title }) {
    firebase.database().ref(`posts/${btoa(email)}`)
      .push({ title: title });
  }
}
