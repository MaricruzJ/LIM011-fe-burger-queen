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

  repeat = []

  getPrueba: any = [];

  repeatedExtras = []
  counter = 0

  getExtras(id: string) {
    this.productExtraSelected = this.productsExtras.find((product) => product.id === id);
    this.getPrueba.push(this.productExtraSelected);
    console.log(this.productsExtras.length);



  }

  repeticiones: number = 0

  addExtras() {

    this.productsExtras.forEach((totalExtras) => {
      this.getPrueba.forEach((extra) => {
        if (extra.data.name === totalExtras.data.name) {
          this.repeticiones += 1
        }
      })
      if((this.repeticiones)%2 === 1){
        this.repeatedExtras.push(totalExtras)
      }
      this.repeticiones = 0
    })

    this.sendArrayOfExtras.emit(this.repeatedExtras)

    this.getPrueba = [];
    this.repeatedExtras = []
  }
}
