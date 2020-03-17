import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { OrderItem } from 'src/app/interfaces/order-item';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() products: any[];
  @Input() productsExtras: any[];
  showModal = false;
  public productSelected: any = {};
  public showExtras: any = {};
  public item: OrderItem;
  public arrayOrder = [];
  public arrExtras = [];
  priceExtras = 0;

  constructor(private orderService: OrderService) {
    this.orderService.currentOrder.subscribe(array => {
      this.arrayOrder = array;
    });
  }

  ngOnInit(): void { }

  getArrayOfExtras(extrasSelected: any) {
    this.arrExtras = extrasSelected;
    this.arrExtras.forEach(product => {
      this.priceExtras += product.data.price;
    });
  }

  toggleModal = (id: string) => {
    if (id != null) {
      this.productSelected = this.products.find((product) => product.id === id);
    }
    if (this.productSelected.data.popup === true) {
      this.showModal = !this.showModal;
    }
    this.item = {
      id: '01',
      quantity: 1,
      product: this.productSelected.data.name,
      extra: this.arrExtras,
      amount: this.productSelected.data.price + this.priceExtras,
    };
    if (this.showModal === false) {
      this.arrayOrder.push(this.item);
    }
    this.orderService.addProductToOrder(this.arrayOrder);
  }
}
