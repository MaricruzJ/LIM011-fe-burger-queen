import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor() { }

  extrasSelected: any = [];
  @Input() productsExtras: any;
  @Input() show;
  @Input() customClass = '';
  @Output() sendArrayOfExtras: EventEmitter<any> = new EventEmitter<any>();
  @Input() closeModal = () => {
    return false;
  }

  ngOnInit(): void {}

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
    this.closeModal();
    this.extrasSelected = [];
  }

}
