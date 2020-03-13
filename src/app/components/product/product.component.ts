import { Component, OnInit, Input } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';

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

  constructor() {
  }

  ngOnInit(): void { }

  toggleModal = (id) => {
    if (id != null) {
      this.productSelected = this.products.find((product) => product.id === id)
    }
    if (this.productSelected.data.popup === true) {
      this.showModal = !this.showModal;
    }
  }

}

