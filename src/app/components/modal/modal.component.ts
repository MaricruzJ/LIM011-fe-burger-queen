import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor() { }
  productExtraSelected: any;
  @Input() arrExtras: object[];
  @Input() productsExtras: any;
  @Input() show = false;
  @Input() customClass = '';
  @Input() productSelected: any;
  @Input() closeCallback = () => (false);

  ngOnInit(): void { }

  getExtras(id: string) {
    this.productExtraSelected = this.productsExtras.find((product) => product.id === id);
    this.arrExtras.push(this.productExtraSelected);
    console.log(this.arrExtras);
  }
}
