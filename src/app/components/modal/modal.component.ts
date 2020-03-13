import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor() { }
  @Input() productsExtras: any;
  @Input() show = false;
  @Input() customClass = '';
  @Input() productSelected: any;
  @Input() closeCallback = () => (false);

  ngOnInit(): void {
  }


}
