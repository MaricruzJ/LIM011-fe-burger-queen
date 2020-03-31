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
  position = 0;
  arrOrder = [];
  indice: string;
  amount = 0;
  orderForm = new FormGroup({
    nameCustomer: new FormControl(''),
    numberTable: new FormControl(0),
  });

  constructor(private orderService: OrderService, private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    this.orderService.currentOrder.subscribe(array => {
      this.arrOrder = array;
      this.amount = 0;
      this.arrOrder.forEach(product => {
        this.amount = product.amount + this.amount;
      });
    });
  }
  add(objectItem) {
    this.orderService.addQuantity(objectItem);
  }

  subtract(objectItem) {
    this.orderService.subtractQuantity(objectItem);
  }

  deleteItem(objectItem) {
    this.orderService.deleteItem(objectItem);
  }

  sendOrder() {
    this.arrOrder.forEach(product => {
      this.amount = product.amount + this.amount;
    });
    this.orderForm.value.items = this.arrOrder;
    this.orderForm.value.date = new Date();
    this.orderForm.value.amount = this.amount;
    // enviar al firestore
    this.firestoreService.setOrder(this.orderForm.value);
  }
}