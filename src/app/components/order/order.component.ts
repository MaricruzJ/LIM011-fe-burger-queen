import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';

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
  total: number;

  constructor(private orderService: OrderService) {
    this.orderService.currentOrder.subscribe(array => {
      this.arrOrder = array;
    });
  }

  ngOnInit(): void { }

  add(objectItem) {
    this.indice = this.arrOrder.indexOf(objectItem).toString();
    this.arrOrder[this.indice].quantity = this.arrOrder[this.indice].quantity + 1;
    this.arrOrder[this.indice].amount = this.arrOrder[this.indice].priceUnit * this.arrOrder[this.indice].quantity;
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
    console.log(this.arrOrder);
  }

  deleteItem(objectItem) {
    const position = this.arrOrder.findIndex((product) => product['id'] === objectItem.id);
    if (position !== -1) {
      this.arrOrder.splice(position, 1);
    }
  }
}
