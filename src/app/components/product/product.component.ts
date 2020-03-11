import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() products: any[];
  public productSelected: any = {}
  showModal = false;

  constructor() {
  }

  ngOnInit(): void { }

  // check(popup, id) {
  //   if (popup) this.toggleModal(id)
  // }

  toggleModal(id){
    console.log(id)
    if (id !== null || id!== undefined) {  
      this.productSelected = this.products.find(product => product.id === id)
    console.log(this.productSelected)
    if(this.productSelected.data.popup === true){
      this.showModal = !this.showModal;
    }
    }
  }
  
}

