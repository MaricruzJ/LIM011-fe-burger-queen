import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private newArray = [];
  position = 0;

  private arrayOrder = new BehaviorSubject([]);
  currentOrder = this.arrayOrder.asObservable();

  constructor() { }


  insertProductToOrder(item) {
    console.log(item);
    
    if (this.newArray.length > 0) {
      this.position = this.newArray.findIndex((element) => element.id === item.id);

      if (this.position !== -1) {
        item.quantity += item.quantity;
        this.newArray[this.position].quantity = this.newArray[this.position].quantity + 1;
        this.newArray[this.position].amount = this.newArray[this.position].amount + this.newArray[this.position].priceUnit;
        // this.priceExtras = 0;
      } else {
        this.newArray.push(item);
      }
    } else {
      this.newArray.push(item);
    }
    this.arrayOrder.next(this.newArray);
    console.log(this.arrayOrder.value);
  }

  addQuantity(item) {

  }

  subtractQuantity(item) {

  }

  deleteItem(item) {

  }
}
