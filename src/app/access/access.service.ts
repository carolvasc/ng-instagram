import { User } from './user.model';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export class AccessService {
  registerUser(user: User) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
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
      .then(response => console.log(response))
      .catch((error: Error) => console.log(error))
  }
}