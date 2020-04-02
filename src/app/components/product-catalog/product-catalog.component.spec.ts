import { ProductCatalogComponent } from './product-catalog.component'
import { ProductComponent } from '../product/product.component'
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockFirestoreService } from 'src/app/__mocks__/FirestoreService-mock'
import { Observable, Observer } from 'rxjs';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { productsMock } from 'src/app/__mocks__/products-mock'


fdescribe('ProductCatalogComponent', () => {

  let component: ProductCatalogComponent;
  let fixture: ComponentFixture<ProductCatalogComponent>;
  let firestoreService: FirestoreService;
  // let btnClassic: DebugElement;
  let btnDrink: DebugElement;
  // let btnPiqueo: DebugElement;
  // let appProduct: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarando el componente y sus componentes hijos
      declarations: [
        ProductCatalogComponent,
        // ProductComponent
      ],
      providers: [
        { provide: FirestoreService, useClass: MockFirestoreService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCatalogComponent);
    component = fixture.componentInstance;
    firestoreService = TestBed.get(FirestoreService);
    fixture.detectChanges();
    // btnClassic = fixture.debugElement.query(By.css('#btn-classic'));
    btnDrink = fixture.debugElement.query(By.css('#btn-drink'));
    // btnPiqueo = fixture.debugElement.query(By.css('#btn-piqueo'));
    // appProduct = fixture.debugElement.query(By.css('.col-12'));

  });

  // Debería crearse el componente
  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  })
  // arrProducts debería ser un array de 1 elemento al incializarse el ngOnInit
  it('debería mostrase solo los clasicos al ejecutarse el ngOnInit, cambiar los filtros necesarios', fakeAsync(() => {
    const mockProducts = productsMock;
    const expectProductsFilter = [
      {
        id: '123c', data: {
          category: 'classic',
          image: "https://firebasestorage.googleapis.com/v0/b/burgerqueen-ee96d.appspot.com/o/simple-vegan.png?alt=media&token=fd963695-7468-4c0b-86f4-78c188eb1e10",
          name: "Hamburguesa simple vegetariana",
          popup: true,
          price: 10
        }
      }];

    const expectProductsExtras = [
      {
        id: '123e', data: {
          category: 'extras',
          image: "https://firebasestorage.googleapis.com/v0/b/burgerqueen-ee96d.appspot.com/o/huevo.png?alt=media&token=2bd203e1-b8ec-49ee-bcd0-2673a6904535",
          name: "Huevo",
          popup: false,
          price: 1,
        }
      }];

    // mockeando el valor de retorno de getProducts creando un observable

    spyOn(firestoreService, 'getProducts').and.returnValue(
      Observable.create((observer: Observer<{ id: string; data: any; }[]>) => {
        observer.next(mockProducts);
        return observer;
      })
    );

    component.ngOnInit();

    tick();

    fixture.detectChanges();

    expect(component.products).toEqual(mockProducts);
    expect(component.productsFilter).toEqual(expectProductsFilter);
    expect(component.productsExtras).toEqual(expectProductsExtras);
  }))

  // ejecución de getByCategory según el tipo de botón que se presiona

/*   it('debería llamar a getByCategory(drinks) cuando se presiona el botón drinks', () => {
    const mockProducts = productsMock;
    component.products = mockProducts;
    component.ngOnInit();
    spyOn(component, 'getByCategory')

    // Dispara el evento click
    btnDrink.nativeElement.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.getByCategory).toHaveBeenCalled();
  }) */

  it('getByCategory con el argumento drinks debería dar el arrayFilter del producto que sea de esa categoría', () => {
    const mockProducts = productsMock;
    component.products = mockProducts;
    //Ejecuta la función getByCategory('drinks');
    component.getByCategory('drinks');

    const expectProductsFilter = [
      {
        id: '123d', data: {
          category: "drinks",
          image: "https://firebasestorage.googleapis.com/v0/b/burgerqueen-ee96d.appspot.com/o/jugo.png?alt=media&token=ecc56c98-6a3c-4cb0-a8f0-278380b22c4a",
          name: "Jugo de frutas natural",
          popup: false,
          price: 7,
        }
      }
    ];

    fixture.detectChanges();

    expect(component.productsFilter).toEqual(expectProductsFilter);
    expect(component.productsExtras.length).toEqual(0);

  })

  it('getByCAtegory con el argumento classic debería retornar como productFilter el producto de esa categoría y 1 extra', () => {

    const mockProducts = productsMock;
    component.products = mockProducts;
    //Ejecuta la función getByCategory('classic');
    component.getByCategory('classic');

    const expectProductsFilter = [
      {
        id: '123c', data: {
          category: 'classic',
          image: "https://firebasestorage.googleapis.com/v0/b/burgerqueen-ee96d.appspot.com/o/simple-vegan.png?alt=media&token=fd963695-7468-4c0b-86f4-78c188eb1e10",
          name: "Hamburguesa simple vegetariana",
          popup: true,
          price: 10
        }
      }];

    const expectProductsExtras = [
      {
        id: '123e', data: {
          category: 'extras',
          image: "https://firebasestorage.googleapis.com/v0/b/burgerqueen-ee96d.appspot.com/o/huevo.png?alt=media&token=2bd203e1-b8ec-49ee-bcd0-2673a6904535",
          name: "Huevo",
          popup: false,
          price: 1,
        }
      }];      
    
      fixture.detectChanges();

      expect(component.productsFilter).toEqual(expectProductsFilter);
      expect(component.productsExtras).toEqual(expectProductsExtras);
  })
});
