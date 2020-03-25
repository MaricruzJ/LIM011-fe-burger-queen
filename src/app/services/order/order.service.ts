import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private arrayOrder = new BehaviorSubject([]);
  currentOrder = this.arrayOrder.asObservable();
  constructor() { }

  addProductToOrder(value) {
    this.arrayOrder.next(value);
    console.log(this.arrayOrder);
  }
}
