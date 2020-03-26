import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { FormControl, FormGroup } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public quantity = 1;
  arrOrder: object[];
  objectItem: object;
  indice: string;
  amount = 0;
  orderForm = new FormGroup({
    nameCustomer: new FormControl(''),
    numberTable: new FormControl(0),
  });

  constructor(private orderService: OrderService, private firestoreService: FirestoreService) {

  }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    this.orderService.currentOrder.subscribe(array => {
      this.arrOrder = array;
      console.log(this.arrOrder);
      this.amount = 0;
      this.arrOrder.forEach(product => {
        this.amount = product['amount'] + this.amount;
      });
    });
  }

  add(objectItem) {
    this.indice = this.arrOrder.indexOf(objectItem).toString();
    this.arrOrder[this.indice].quantity = this.arrOrder[this.indice].quantity + 1;
    this.arrOrder[this.indice].amount = this.arrOrder[this.indice].priceUnit * this.arrOrder[this.indice].quantity;
    this.amount = 0;
    this.arrOrder.forEach(product => {
      this.amount = product['amount'] + this.amount;
    });
  }

  subtract(objectItem) {
    this.indice = this.arrOrder.indexOf(objectItem).toString();
    if (this.arrOrder[this.indice].quantity >= 1) {
      this.arrOrder[this.indice].quantity = this.arrOrder[this.indice].quantity - 1;
      this.arrOrder[this.indice].amount = this.arrOrder[this.indice].priceUnit * this.arrOrder[this.indice].quantity;
    }
    if (this.arrOrder[this.indice].quantity === 0) {
      this.deleteItem(objectItem);
    }
    this.amount = 0;
    this.arrOrder.forEach(product => {
      this.amount = product['amount'] + this.amount;
    });
  }

  deleteItem(objectItem) {
    const position = this.arrOrder.findIndex((product) => product['id'] === objectItem.id);
    if (position !== -1) {
      this.arrOrder.splice(position, 1);
    }
    this.amount = 0;
    this.arrOrder.forEach(product => {
      this.amount = product['amount'] + this.amount;
    });
  }

  sendOrder() {
    this.arrOrder.forEach(product => {
      this.amount = product['amount'] + this.amount;
    });
    this.orderForm.value.items = this.arrOrder;
    this.orderForm.value.date = new Date();
    this.orderForm.value.amount = this.amount;
    console.log(this.orderForm.value);
    // enviar al firestore
    this.firestoreService.setOrder(this.orderForm.value);
  }
}
