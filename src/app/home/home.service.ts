import { Injectable } from '@angular/core';

import { Md5 } from 'ts-md5/dist/md5';

// Firebase
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  createPost({ email, title, image }) {
    const md5 = new Md5();
    let fileName = md5.appendStr(image.name).end();
    fileName += (Math.round(Math.random() * 1000000)).toString();

    firebase.storage().ref()
      .child(`images/${fileName}`)
      .put(image);

    // firebase.database().ref(`posts/${btoa(email)}`)
    //   .push({ title: title });
  }
}
