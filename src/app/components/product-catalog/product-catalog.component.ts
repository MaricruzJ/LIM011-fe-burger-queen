import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.scss']
})

export class ProductCatalogComponent implements OnInit {

  public products: any[];
  public productsFilter: any[];
  public productsExtras: any[];

  constructor(private firestoreService: FirestoreService) {  }

  ngOnInit(): void {
    this.firestoreService.getProducts().subscribe((productsSnapshot) => {
      this.products = productsSnapshot;
      // productsSnapshot.forEach((productData: any) => {
      //   this.products.push(productData);
      // });
      this.productsFilter = this.products.filter((product) => product.data.category === 'classic');
      this.productsExtras = this.products.filter((product) => product.data.category === 'extras');
    });
  }

  getByCategory(nameCategory: string) {
    this.productsFilter = this.products.filter((product) => product.data.category === nameCategory);
    this.productsExtras = [];
    if (nameCategory === 'classic') {
      this.productsExtras = this.products.filter((product) => product.data.category === 'extras');
    }
    return this.productsFilter;
  }
}
