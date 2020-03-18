import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor() { }

  extrasSelected: any = [];
  @Input() productsExtras: any;
  @Input() show = false;
  @Input() customClass = '';
  @Output() sendArrayOfExtras: EventEmitter<any> = new EventEmitter<any>();
  @Input() closeCallback = () => (false);

  ngOnInit(): void { }

  getExtraSelected(productExtraSelected: any) {
    const position = this.extrasSelected.findIndex((product) => product.id === productExtraSelected.id);
    if (position !== -1) {
      this.extrasSelected.splice(position, 1);
    } else {
      this.extrasSelected.push(productExtraSelected);
    }
  }

  addExtras() {
    this.sendArrayOfExtras.emit(this.extrasSelected);
    this.extrasSelected = [];
    this.closeCallback()
  }
}
