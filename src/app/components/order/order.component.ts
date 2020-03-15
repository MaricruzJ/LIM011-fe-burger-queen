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

  constructor(private orderService: OrderService) {
    this.orderService.currentOrder.subscribe(array => {
      this.arrOrder = array;
      console.log(this.arrOrder);
    });
  }

  ngOnInit(): void { }

  add() {
    this.quantity = this.quantity + 1;
  }

  subtract() {
    if (this.quantity >= 1) {
      this.quantity = this.quantity - 1;
    }
  }
}
