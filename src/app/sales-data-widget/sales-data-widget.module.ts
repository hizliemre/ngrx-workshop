import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SalesDataWidgetComponent } from './sales-data-widget.component';

@NgModule({
  declarations: [SalesDataWidgetComponent],
  imports: [CommonModule],
  exports: [SalesDataWidgetComponent],
})
export class SalesDataWidgetModule { }
