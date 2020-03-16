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
  public productSelected: any = {};
  public showExtras: any = {};
  public item: OrderItem;
  public arrayOrder = [];
  showModal = false;

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
    } else {
      this.item = {
        id: '01',
        quantity: 1,
        product: this.productSelected.data.name,
        extra: [],
        amount: this.productSelected.data.price,
      }
      this.arrayOrder.push(this.item);
    }
    this.orderService.addProductToOrder(this.arrayOrder);
  }
  // getArray: any;
  getArrayOfExtras(getPrueba:any){
    // this.getArray = 
    getPrueba;
    console.log(getPrueba);
    
    // console.log(this.getArray);
  }
}
