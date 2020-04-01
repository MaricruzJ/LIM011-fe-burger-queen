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
  });

  constructor(private orderService: OrderService, private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.getOrder();
  }

  getOrder() {
    this.orderService.currentOrder.subscribe(array => {
      this.arrOrder = array;
      console.log(this.arrOrder);
      this.amount = 0;
      this.arrOrder.forEach(product => {
        this.amount = product.amount + this.amount;
      });
    });
  }
  addItem(objectItem) {
    this.orderService.addQuantity(objectItem);
  }

  subtractItem(objectItem) {
    this.orderService.subtractQuantity(objectItem);
  }

  deleteItem(objectItem) {
    this.orderService.deleteItem(objectItem);
  }

  sendOrder() {
    this.amount = 0;
    this.arrOrder.forEach(product => {
      this.amount = product.amount + this.amount;
    });
    this.orderForm.value.items = this.arrOrder;
    this.orderForm.value.date = new Date();
    this.orderForm.value.amount = this.amount;

    if (this.arrOrder.length > 0 && this.orderForm.value.nameCustomer !== '') {
      // enviar al firestore solo si hay items en la orden.
      this.firestoreService.setOrder(this.orderForm.value);
      // Limpiar contenido del input y tabla.
      this.orderForm.patchValue({
        nameCustomer: ''
      });
      this.orderService.resetOrder();
    }
  }
}