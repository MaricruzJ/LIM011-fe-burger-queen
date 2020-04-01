import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFirestore: AngularFirestore) { }

  getProducts() {
  
    return this.angularFirestore.collection('products').snapshotChanges()
    .pipe(
      map(actions => actions.map(action => {
        const id = action.payload.doc.id;
        const data = action.payload.doc.data();
        return { id: id, data: data};
      }))
    );  
  }

  public setOrder(order: any[]) {
    return this.angularFirestore.collection('orders').add(order)
  }
}
