import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { OrderService } from 'src/app/services/order/order.service';
import { FirestoreService } from 'src/app/services/firestore/firestore.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let form: DebugElement;
  let nameCustomer: DebugElement;
  let btnAdd: DebugElement;
  let btnSubtract: DebugElement;
  let btnSend: DebugElement;
  let orderService: Partial<OrderService>;
  let firestoreService: Partial<FirestoreService>;

  beforeEach(async(() => {
    const orderServiceStub = jasmine.createSpyObj('OrderService',
      ['addQuantity', 'subtractQuantity', 'deleteItem', 'currentOrder', 'arrayOrder']);
    const firestoreServiceStub = jasmine.createSpyObj('FirestoreService', ['setOrder']);

    TestBed.configureTestingModule({
      declarations: [OrderComponent],
      providers: [
        { provide: OrderService, useValue: orderServiceStub },
        { provide: FirestoreService, useValue: firestoreServiceStub }
      ],
      imports: [ReactiveFormsModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    orderService = TestBed.inject(OrderService);
    firestoreService = TestBed.inject(FirestoreService);
    form = fixture.debugElement.query(By.css('form'));
    nameCustomer = form.query(By.css('.customer'));
    btnSend = form.query(By.css('.btn-send'));
    btnAdd = form.query(By.css('.btn-add'));
    btnSubtract = form.query(By.css('.btn-subtract'));
    fixture.detectChanges();
  });

  it('1.- Debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('2.- Debería mostrar el valor de formValue en los inputs', () => {
    // primera vez cuando se carga el componente.
    expect(nameCustomer.nativeElement.value).toBe('');
    // Modificando el valor de los inputs
    component.orderForm.setValue({ nameCustomer: 'Juanito Alimaña' });
    fixture.detectChanges();
    expect(nameCustomer.nativeElement.value).toBe('Juanito Alimaña');
  });

  it('3.- Debería de llamar a addItem al darle click en el boton', () => {
    spyOn(component, 'addItem');
    btnAdd[0].nativeElement.click();
    fixture.detectChanges();
    expect(component.addItem).toHaveBeenCalled();
  });

  it('4.- Debería de llamar a subtractItem al dar click en el boton', () => {
    spyOn(component, 'subtractItem');
    btnSubtract.nativeElement.click();
    fixture.detectChanges();
    expect(component.subtractItem).toBeTruthy();
  });

  it('5.- Debería de llamar a deleteItem al dar click en el boton', () => {
    spyOn(component, 'deleteItem');
    btnSubtract.nativeElement.click();
    fixture.detectChanges();
    expect(component.deleteItem).toBeTruthy();
  });

  it('6.- Deberia llamar a sendOrder al dar click al button', () => {
    // creamos un spy de sendOrder method para comprobar que haya sido llamado
    spyOn(component, 'sendOrder');
    // disparams el click event del button
    btnSend.nativeElement.click();
    // fixture.detectChanges() detecta los cambios en el componente | template
    fixture.detectChanges();
    // comprobar que sendOrder fue llamado
    expect(component.sendOrder).toHaveBeenCalled();
  });

  it('7.- Deberia llamar a sendOrder al dar submit al form', () => {
    // creamos un spy de sendOrder method para comprobar que haya sido llamado
    spyOn(component, 'sendOrder');

    const formEl: HTMLElement = form.nativeElement;
    // disparamos el submit event del form
    formEl.dispatchEvent(new Event('submit'));
    // fixture.detectChanges() detecta los cambios en el componente | template
    fixture.detectChanges();
    // comprobar que sendOrder fue llamado
    expect(component.sendOrder).toHaveBeenCalled();
  });

  it('8.- Deberia llamar a setOrder al ejecutar sendOrder', () => {
    // actualizamos el valor de orderValue
    component.orderForm.setValue({ nameCustomer: 'Juanita' });
    // fixture.detectChanges() detecta los cambios en el componente | template
    fixture.detectChanges();
    component.sendOrder();
    fixture.detectChanges();
    // comprobar que setOrder method fue llamado
    // expect(firestoreService.setOrder).toHaveBeenCalled();
    // comprobar que setOrder method fue llamado con el param 'Juanita'
    expect(firestoreService.setOrder).toHaveBeenCalledWith('Juanita');
  });
});
