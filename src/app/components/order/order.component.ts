import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public quantity = 1;

  constructor() { }

  ngOnInit(): void {

  }

  add() {
    this.quantity = this.quantity + 1;
  }

  subtract() {
    this.quantity = this.quantity - 1;
  }

}
