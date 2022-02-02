import {Component, Input, OnChanges, OnInit, SimpleChange} from '@angular/core';
declare var window: any;

interface Data {
  title: string,
  message: string
}

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit, OnChanges {
  @Input() data: Data | undefined;
  title: string = '';
  message: string = '';

  constructor() {}
  ngOnInit(): void {}

  ngOnChanges(changes: { [property: string]: SimpleChange }): void {
    if(this.data != undefined) {
      let change: SimpleChange = changes['data'];
      this.title = change.currentValue.title;
      this.message = change.currentValue.message;

      let formModal = new window.bootstrap.Modal(
        document.getElementById('myModal')
      );

      formModal.show();
    }
  }



}
