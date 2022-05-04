import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducer, SALES_DATA_WIDGET_FEATURE_KEY } from './+state/reducer';
import { SalesDataWidgetComponent } from './sales-data-widget.component';
@NgModule({
  declarations: [SalesDataWidgetComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(SALES_DATA_WIDGET_FEATURE_KEY, reducer)
  ],
  exports: [SalesDataWidgetComponent],
})
export class SalesDataWidgetModule { }
