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
  public arrayOrder = [];
  public arrExtras = [];
  priceExtras = 0;
  position = 0;
  changeModalValue = 0;
  montoTotal = 0;

  constructor(private orderService: OrderService) {
    this.orderService.currentOrder.subscribe(array => {
      this.arrayOrder = array;
    });
    console.log(this.arrayOrder);
  }

  ngOnInit(): void { }

  getArrayOfExtras(extrasSelected: any) {
    this.arrExtras = extrasSelected;
    this.arrExtras.forEach(product => {
      this.priceExtras += product.data.price;
    });
  }

  toggleModal = (id: string) => {
    console.log(this.changeModalValue);
    
    if (id != null) {
      this.productSelected = this.products.find((product) => product.id === id);
    }

    // AGREGAR IDENTIFICADOR AL ID DEL ITEM, CON NOMBRES DE LOS EXTRAS
    const letra = [];
    this.arrExtras.forEach((elem) => {
      if (elem.data.name !== '') {
        letra.push(elem.data.name.slice(0, 1));
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

    // CREACION DEL ITEM
    if (this.changeModalValue !== 1) {
      this.item = {
        id: this.newProductSelected.id + letra,
        quantity: 1,
        product: this.newProductSelected.data.name,
        extra: this.arrExtras,
        amount: this.newProductSelected.data.price + this.priceExtras,
        priceUnit: this.newProductSelected.data.price + this.priceExtras,
      };      
      this.orderService.addProductTOOrder(this.item);
      this.arrExtras = [];
      this.productSelected = {};
      this.newProductSelected = {};
      this.changeModalValue = 0;
      this.priceExtras = 0;
    }
  }
}
