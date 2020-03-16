import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor() { }

  public productExtraSelected: any;
  @Input() arrayOrder: object[];
  @Input() productsExtras: any;
  @Input() show = false;
  @Input() customClass = '';
  @Input() productSelected: any;
  @Input() closeCallback = () => (false);
  @Output() sendArrayOfExtras: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void { }
  repeatedExtras = [];

  getPrueba: any = [];

  getExtras(id: string) {
    this.productExtraSelected = this.productsExtras.find((product) => product.id === id);
    this.getPrueba.push(this.productExtraSelected)

    this.getPrueba.forEach((extraSelect) => {
      this.repeatedExtras[extraSelect] = ((this.repeatedExtras[extraSelect] || 0) + 1) %2;
      console.log(extraSelect);
      // if(extraSelect.id)
    });
  }

  addExtras(){
    console.log(this.repeatedExtras);
    this.sendArrayOfExtras.emit(this.getPrueba);
  }
}
