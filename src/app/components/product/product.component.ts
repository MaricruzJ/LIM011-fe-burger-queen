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
  showModal:boolean = false;

  constructor() {
  }

  ngOnInit(): void { }
 

  toggleModal(id) {
    if (id !== null) {
      this.productSelected = this.products.find((product) => product.id === id)
    }
    this.showModal = !this.showModal;
  }

  check(popup, id) {
    if (popup) this.toggleModal(id)
  }
}

