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
    this.indice= this.arrOrder.indexOf(objectItem).toString()
    this.arrOrder[this.indice].quantity = this.arrOrder[this.indice].quantity + 1;
    this.arrOrder[this.indice].amount =this.arrOrder[this.indice].priceUnit*this.arrOrder[this.indice].quantity 

    console.log(this.arrOrder);
    // console.log(this.total);
    

    
  }

  subtract(objectItem) {
    this.indice= this.arrOrder.indexOf(objectItem).toString()
    if (this.arrOrder[this.indice].quantity >= 1) {
      this.arrOrder[this.indice].quantity = this.arrOrder[this.indice].quantity - 1;
    }
    // // this.total =this.arrOrder[this.indice].amount*this.arrOrder[this.indice].quantity 
    // console.log(this.total);
    this.arrOrder[this.indice].amount =this.arrOrder[this.indice].priceUnit*this.arrOrder[this.indice].quantity 

    console.log(this.arrOrder);

  }
}
