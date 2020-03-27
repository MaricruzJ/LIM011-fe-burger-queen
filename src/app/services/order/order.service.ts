import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private arrayOrder = new BehaviorSubject<any>([]);
  currentOrder = this.arrayOrder.asObservable();
  public position:number;
  
  constructor() { }

  addProductTOOrder(item) {
    const itemObj = {
      ...item,
      quantity: 1
    };

    const newArrObj = [
      ...this.arrayOrder.value,
      itemObj
    ]
    this.arrayOrder.next(newArrObj);

}

  // addProductToOrder(newItem) {
    // console.log(newItem);
    
      // console.log(this.arrayOrder.next((newItem)));
      
  
    // ENCONTRAR LA POSICION DEL ITEM REPETIDO
    // this.position = this.arrayOrder.findIndex((element) => element.id === this.item.id);

    // if (this.position !== -1 && this.changeModalValue !== 1) {
    //   this.item.quantity += this.item.quantity;
    //   this.arrayOrder[this.position].quantity = this.arrayOrder[this.position].quantity + 1;
    //   this.arrayOrder[this.position].amount = this.arrayOrder[this.position].amount + this.arrayOrder[this.position].priceUnit;
    //   this.changeModalValue = 0;
    //   this.priceExtras = 0;
    // }

    // AGREGAR ITEM AL ARRAYorder PARA ENVIAR AL ORDER COMPONENT
    // if (this.showModal === false && this.position === -1) {
    //   this.arrayOrder.push(this.item);
    //   this.arrExtras = [];
    //   this.priceExtras = 0;
    //   this.changeModalValue = 0;

    // }

    // this.arrayOrder.next(value);
  //   console.log(this.arrayOrder);

  // }
}
