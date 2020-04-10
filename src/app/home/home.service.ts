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

    firebase.database().ref(`posts/${btoa(email)}`)
      .push({ title: title })
      .then((response) => {
        fileName = response.key;

        // Upload da imagem
        firebase.storage().ref()
          .child(`images/${fileName}`)
          .put(image)
          .on(firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
              this.progressService.status = 'progress';
              this.progressService.state = snapshot;
            },
            () => this.progressService.status = 'error',
            () => this.progressService.status = 'done'
          )
      });
  }

  /**
   * Retorna um objeto com o post
   * @param email 
   */
  getPosts(email: string) {
    return new Promise((resolve, reject) => {
      // Consultar os posts
      firebase.database().ref(`posts/${btoa(email)}`)
        .orderByKey()
        .once('value')
        .then(snapshot => {
          let posts = [];

          snapshot.forEach(childSnapshot => {
            let post = childSnapshot.val();
            post.key = childSnapshot.key;

            posts.push(post);
          });

          return posts.reverse(); // ordem dos posts por ordem decrescente
        })
        .then(posts => {
          posts.forEach(post => {
            // Consultar a url da imagem
            firebase.storage().ref()
              .child(`images/${post.key}`)
              .getDownloadURL()
              .then((url: string) => {
                post.imageUrl = url;

                // Consultar o usuário para recuperar o nome
                firebase.database().ref(`user_detail/${btoa(email)}`)
                  .once('value')
                  .then(snapshot => {
                    post.userName = snapshot.val().userName;
                  });
              });
          });
          resolve(posts);
        });
    });
  }
}