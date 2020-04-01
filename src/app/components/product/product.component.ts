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
  public newProductSelected: any = {};
  public productSelected: any = {};
  public showExtras: any = {};
  public item: OrderItem;
  public arrExtras = [];
  priceExtras = 0;
  changeModalValue = 0;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void { }

  getArrayOfExtras(extrasSelected: any) {
    this.arrExtras = extrasSelected;
    this.arrExtras.forEach(product => {
      this.priceExtras += product.data.price;
    });
  }

  getItem = (id: string) => {
    if (id != null) {
      this.productSelected = this.products.find((product) => product.id === id);
    }

    // Agregar identificador al ID del item, con nombres de los extras.
    const letra = [];
    this.arrExtras.forEach((product) => {
      if (product.data.name !== '') {
        letra.push(product.data.name.slice(0, 1));
        letra.sort();
      }
    });

    if (this.productSelected.data.popup === false) {
      this.newProductSelected = this.productSelected;

    } else {
      this.showModal = !this.showModal;
      this.changeModalValue = this.changeModalValue + 1;
      if (this.changeModalValue === 2) {
        this.newProductSelected = this.productSelected;
      }
    }

    // Creación del item
    if (this.changeModalValue !== 1) {
      this.item = {
        id: this.newProductSelected.id + letra,
        quantity: 1,
        product: this.newProductSelected.data.name,
        extra: this.arrExtras,
        amount: this.newProductSelected.data.price + this.priceExtras,
        priceUnit: this.newProductSelected.data.price + this.priceExtras,
      };
      this.orderService.insertProductToOrder(this.item);
      this.arrExtras = [];
      this.productSelected = {};
      this.newProductSelected = {};
      this.changeModalValue = 0;
      this.priceExtras = 0;
    }
  }
}
