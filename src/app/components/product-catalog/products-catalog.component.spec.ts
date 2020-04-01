// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { ProductCatalogComponent } from './product-catalog.component';
// import { DebugElement } from '@angular/core';
// import { FirestoreService } from 'src/app/services/firestore/firestore.service';
// import { By } from '@angular/platform-browser';

// xdescribe('ProductCatalogComponent', () => {
//   let component: ProductCatalogComponent;
//   let fixture: ComponentFixture<ProductCatalogComponent>;
//   let button: DebugElement;

//   beforeEach(async(() => {
//     const FirestoreServiceStub = jasmine.createSpyObj('FirestoreService', ['getProducts'])
    
//     TestBed.configureTestingModule({
//       declarations: [ ProductCatalogComponent ],
//       providers:[
//         { provider: FirestoreService, useValue: FirestoreServiceStub }
//       ],
//       imports: [ ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProductCatalogComponent);
//     component = fixture.componentInstance;
//     TestBed.inject(FirestoreService);
//     fixture.detectChanges();
//   });

//   it('debería crearse el componente', () => {
//     expect(component).toBeTruthy();
//   });

//   it('debería mostrar todos los productos clásicos cuando se presiona el botón CLÁSICOS', () => {
//     const bClassic = <HTMLButtonElement>document.getElementById('btn-classic')
//     expect()
//   })
// });