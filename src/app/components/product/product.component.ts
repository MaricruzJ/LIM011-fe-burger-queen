import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() products: any[];
  @Input() productsExtras: any[];
  public productSelected: any = {};
  public showExtras: any = {};
  showModal = false;
  public arrayOrder = [];

  constructor(private orderService: OrderService) {
    this.orderService.currentOrder.subscribe(array => {
      this.arrayOrder = array;
    });
  }

  ngOnInit(): void { }

  toggleModal = (id: string) => {
    if (id != null) {
      this.productSelected = this.products.find((product) => product.id === id);
    }
    if (this.productSelected.data.popup === true) {
      this.showModal = !this.showModal;
    }
    this.arrayOrder.push(this.productSelected);
    this.orderService.changeOrder(this.arrayOrder);
  }
}

