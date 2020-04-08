import { Injectable } from '@angular/core';

import { Md5 } from 'ts-md5/dist/md5';

// Firebase
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

import { ProgressService } from '../progress.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private progressService: ProgressService) { }

  createPost({ email, title, image }) {
    const md5 = new Md5();
    let fileName = md5.appendStr(image.name).end();
    fileName += (Math.round(Math.random() * 1000000)).toString();

    firebase.storage().ref()
      .child(`images/${fileName}`)
      .put(image)
      .on(firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          this.progressService.status = 'progress';
          this.progressService.state = snapshot;
        },
        error => this.progressService.status = 'error',
        () => this.progressService.status = 'done'
      )

    // firebase.database().ref(`posts/${btoa(email)}`)
    //   .push({ title: title });
  }
}
