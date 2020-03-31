import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement} from '@angular/core';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let a: HTMLElement;


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    a = fixture.nativeElement.querySelector('a');
  });

  it('no hay etiqueta a en el DOM despues de createComponent()', () => {
    expect(a.textContent).toEqual('');
  });

  it('debe mostrar el título original', () => {
    fixture.detectChanges();
    expect(a.textContent).toContain(component.title);
  });

it('debería mostrar el título original después de detectChanges()', () => {
  fixture.detectChanges();
  expect(a.textContent).toContain(component.title);
});

it('debería mostrar un título si se cambia de título', () => {
  component.title = 'Burger Kings';
  fixture.detectChanges();
  expect(a.textContent).toContain('Burger Kings');
});
});
