import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { OrderItem } from 'src/app/interfaces/order-item';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent{
  @Input() products: any[];
  @Input() productsExtras: any[];
  showModal = false;
  public productSelected: any = {};
  public showExtras: any = {};
  public item: OrderItem;
  public arrExtras = [];
  priceExtras = 0;
  position = 0;
  changeModalValue = 0;
  montoTotal = 0;

  constructor(private orderService: OrderService) { }

  /* ngOnInit(): void { } */

  getArrayOfExtras(extrasSelected: any) {
    this.arrExtras = extrasSelected;
    this.arrExtras.forEach(product => {
      this.priceExtras += product.data.price;
    });
  }

  getItem = (element: any) => {
    if (element != null) {
      this.productSelected = this.products.find((product) => product.id === element.id);
    }

    if (this.productSelected.data.popup === true) {
      this.showModal = !this.showModal;
      this.changeModalValue = this.changeModalValue + 1;
    } else {
      this.arrExtras = [];
    }

    // AGREGAR IDENTIFICADOR AL ID DEL ITEM, CON NOMBRES DE LOS EXTRAS
    const letra = [];
    this.arrExtras.forEach((elem) => {
      if (elem.data.name !== '') {
        letra.push(elem.data.name.slice(0, 1));
        letra.sort();
      }
    });

    // CREACION DEL ITEM
    this.item = {
      id: this.productSelected.id + letra,
      quantity: 1,
      product: this.productSelected.data.name,
      extra: this.arrExtras,
      amount: this.productSelected.data.price + this.priceExtras,
      priceUnit: this.productSelected.data.price + this.priceExtras,
    };

    /* // ENCONTRAR LA POSICION DEL ITEM REPETIDO
    this.position = this.arrayOrder.findIndex((element) => element.id === this.item.id);

    if (this.position !== -1 && this.changeModalValue !== 1) {
      this.item.quantity += this.item.quantity;
      this.arrayOrder[this.position].quantity = this.arrayOrder[this.position].quantity + 1;
      this.arrayOrder[this.position].amount = this.arrayOrder[this.position].amount + this.arrayOrder[this.position].priceUnit;
      this.changeModalValue = 0;
      this.priceExtras = 0;
    }

    // Agregar item al arrayOrder para enviar al servicio y que este sea usado en el componente order component 
    if (this.showModal === false && this.position === -1) {
      this.arrayOrder.push(this.item);
      this.arrExtras = [];
      this.priceExtras = 0;
      this.changeModalValue = 0;
    } */
    this.orderService.insertProductToOrder(this.item);
  }
}
