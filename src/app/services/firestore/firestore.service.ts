import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) { }

  public getProducts() {
    return this.firestore.collection('products').snapshotChanges();
  }

  public setOrder(order) {
    this.firestore.collection('orders').add(order).then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    }).catch((error) => {
      console.log('Error adding document: ', error);
    });
  }
}
