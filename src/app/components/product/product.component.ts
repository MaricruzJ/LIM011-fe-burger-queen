import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'src/app/services/order/order.service';
import { OrderItem } from 'src/app/interfaces/order-item';
import { element } from 'protractor';

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
  priceExtras: number = 0;

  constructor(private orderService: OrderService) {
    this.orderService.currentOrder.subscribe(array => {
      this.arrayOrder = array;
    });
    this.priceExtras = 0;
  }

  ngOnInit(): void { }

  getArrayOfExtras(extrasSelected: any) {
    this.arrExtras = extrasSelected;
    this.arrExtras.forEach(product => {
      this.priceExtras += product.data.price;
    });
  }

  position = 0
  changeModalValue = 0
  toggleModal = (id: string) => {
    if (id != null) {
      this.productSelected = this.products.find((product) => product.id === id);
      this.productSelected.data.quantity += this.productSelected.data.quantity
    }

    if (this.productSelected.data.popup === true) {
      this.showModal = !this.showModal;
      this.changeModalValue = this.changeModalValue + 1
    }
    console.log(this.changeModalValue);


    //AGREGAR IDENTIFICADOR AL ID DEL ITEM, CON NOMBRES DE LOS EXTRAS
    let letra = []
    this.arrExtras.forEach((elem) => {
      console.log(elem.data.name);

      if (elem.data.name !== '') {
        letra.push(elem.data.name.slice(0, 1))
        letra.sort();
      }

    })

    //CREACION DEL ITEM
    this.item = {
      id: this.productSelected.id + letra,
      quantity: 1,
      product: this.productSelected.data.name,
      extra: this.arrExtras,
      amount: this.productSelected.data.price + this.priceExtras,
      priceUnit: this.productSelected.data.price + this.priceExtras,
    };


    // ENCONTRAR LA POSICION DEL ITEM REPETIDO
    this.position = this.arrayOrder.findIndex((element) => element.id === this.item.id)
    console.log(this.position);


    if (this.position !== -1 ) {
      this.item.quantity += this.item.quantity
      console.log(this.item.quantity);
      this.arrayOrder[this.position].quantity = this.arrayOrder[this.position].quantity + 1;
    } 


    if (this.showModal === false) {
      this.arrayOrder.push(this.item);
      this.arrExtras = [];
      this.priceExtras = 0;
      this.changeModalValue = 0
    }

    // (ele.id === this.item.id) elemem de finINdex
    //   if(position !== -1){
    //     this.arrayOrder[position].quantity = this.arrayOrder[position].quantity + 1;
    // }else{
    //   this.item.quantity = 1

    // }
    // if (this.showModal === false && position === -1) {
    //     this.arrayOrder.push(this.item);
    //     this.arrExtras = [];
    //     this.priceExtras = 0;
    //   }
    //   console.log(position);

    //   console.log(this.item.id);







    // this.position = this.arrayOrder.findIndex((element)=> element === this.item)
    // console.log(this.position);


    // if(this.position !== -1){
    //   this.item.quantity += this.item.quantity
    //   console.log(this.item.quantity);
    //   this.arrayOrder[this.position].quantity = this.arrayOrder[this.position].quantity + 1;
    // } else{
    //   if(this.showModal === false){
    //     this.arrayOrder.push(this.item);
    //   }
    // }


    // if (position === -1 && this.showModal === false) {
    //   this.arrayOrder.push(this.item);
    //   console.log();

    // } else {
    //   this.item.quantity += this.item.quantity
    //   console.log(this.item.quantity);
    //   this.arrayOrder[position].quantity = this.arrayOrder[position].quantity + 1;

    // }


    // if (position !== -1 && this.showModal === true ) {
    //   this.item.quantity += this.item.quantity
    //   console.log(this.item.quantity);
    //   this.arrayOrder[position].quantity = this.arrayOrder[position].quantity + 1;
    //   // this.item = {}

    // } else if (this.showModal === false) {
    //   // this.item.quantity += this.item.quantity
    //   this.arrayOrder.push(this.item);
    // }

    this.orderService.addProductToOrder(this.arrayOrder);

  }
}
