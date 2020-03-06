import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})
export class ProductCatalogComponent implements OnInit {

  public products = [];
  public productsFilter = [];

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.firestoreService.getProducts().subscribe((productsSnapshot) => {
      this.products = [];
      productsSnapshot.forEach((productData: any) => {
        this.products.push({
          id: productData.payload.doc.id,
          data: productData.payload.doc.data()
        });
      });
    });
  }

  getClassic() {
    this.productsFilter = this.products.filter((product) => product.data.category === 'classic');
  }

  getDrinks() {
    this.productsFilter = this.products.filter((product) => product.data.category === 'drinks');
  }

  getPiqueos() {
    this.productsFilter = this.products.filter((product) => product.data.category === 'piqueos');
  }

  getExtras() {
    this.productsFilter = this.products.filter((product) => product.data.category === 'extras');
  }
}
