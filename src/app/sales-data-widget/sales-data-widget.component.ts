import { Component, Input } from '@angular/core';

@Component({
  selector: 'sales-data-widget',
  templateUrl: './sales-data-widget.component.html',
})
export class SalesDataWidgetComponent {

  @Input() data: any;

}
