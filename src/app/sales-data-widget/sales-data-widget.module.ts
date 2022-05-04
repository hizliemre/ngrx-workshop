import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { salesDataWidgetFeature } from './+state/reducer';
import { SalesDataWidgetComponent } from './sales-data-widget.component';
@NgModule({
  declarations: [SalesDataWidgetComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(salesDataWidgetFeature),
  ],
  exports: [SalesDataWidgetComponent],
})
export class SalesDataWidgetModule { }
