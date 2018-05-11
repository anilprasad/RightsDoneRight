import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { DocumentSnapshot } from '@firebase/firestore-types';


@Injectable()
export class UserService {

  userChangeRef: AngularFirestoreDocument<User>;

  userDetails: Observable<User>;

  currentUser: User;

  constructor(
    public afs: AngularFirestore,
    public auth: AuthService,
    private afAuth: AngularFireAuth) {

    this.currentUser = this.afAuth.auth.currentUser;

    this.userDetails = this.afs.doc(`users/${this.currentUser.uid}`).valueChanges();

    this.userChangeRef = this.afs.doc(`users/${this.currentUser.uid}`);


  }

  getLoggedInUserDetails() {
    return this.userDetails;
  }

  getUserUidWithAddress(address: string): Promise<DocumentSnapshot> {
    let ref = this.afs.doc(`ethereumAddresses/${address}`).ref;
    return ref.get();
  }


  // getUserWithUid(uid: string): Promise<any> {

  //   let ref = this.afs.doc(`users/${uid}`).ref;
  //   return ref.get().then(doc => {
  //     if (doc.exists) {
  //         return doc.data;
  //     } else {
  //         return null;
  //     }
  // }).catch(function(error) {
  //     console.log("Error getting document:", error);
  // });  } 


  getUserWithUid(uid): Promise<DocumentSnapshot> {
    let ref = this.afs.doc(`users/${uid}`).ref;
    return ref.get();
  }

  pushUnapprovedWorkToUser(data) {
    this.afs.firestore.runTransaction(transaction => {
      return transaction.get(this.userChangeRef.ref).then(snapshot => {
        var largerArray = snapshot.get('unapprovedWorks');
        if (typeof largerArray != 'undefined') {
          largerArray.push(data);
        } else {
          largerArray = new Array<number>();
          largerArray.push(data);
        }
        transaction.update(this.userChangeRef.ref, 'unapprovedWorks', largerArray);
      });
    });
  }


}
