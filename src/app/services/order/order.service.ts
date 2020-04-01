import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private newArray = [];
  position = 0;
  indice: string;

  private arrayOrder = new BehaviorSubject([]);
  currentOrder = this.arrayOrder.asObservable();

  constructor() { }

  insertProductToOrder(item) {
    // console.log(item);
    if (this.newArray.length > 0) {
      this.position = this.newArray.findIndex((element) => element.id === item.id);
      if (this.position !== -1) {
        item.quantity += item.quantity;
        this.newArray[this.position].quantity = this.newArray[this.position].quantity + 1;
        this.newArray[this.position].amount = this.newArray[this.position].amount + this.newArray[this.position].priceUnit;
      } else {
        this.newArray.push(item);
      }
    } else {
      this.newArray.push(item);
    }
    this.arrayOrder.next(this.newArray);
  }

  addQuantity(item) {
    this.indice = this.newArray.indexOf(item).toString();
    this.newArray[this.indice].quantity = this.newArray[this.indice].quantity + 1;
    this.newArray[this.indice].amount = this.newArray[this.indice].priceUnit * this.newArray[this.indice].quantity;

    this.arrayOrder.next(this.newArray);
  }

  subtractQuantity(item) {
    this.indice = this.newArray.indexOf(item).toString();
    if (this.newArray[this.indice].quantity >= 1) {
      this.newArray[this.indice].quantity = this.newArray[this.indice].quantity - 1;
      this.newArray[this.indice].amount = this.newArray[this.indice].priceUnit * this.newArray[this.indice].quantity;
    }
    if (this.newArray[this.indice].quantity === 0) {
      this.deleteItem(item);
    }
    this.arrayOrder.next(this.newArray);
  }

  deleteItem(item) {
    const position = this.newArray.findIndex((product) => product['id'] === item.id);
    if (position !== -1) {
      this.newArray.splice(position, 1);
    }
    this.arrayOrder.next(this.newArray);
  }

  resetOrder() {
    this.newArray = [];
    this.arrayOrder.next(this.newArray);
  }
}
