import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SalesDataWidgetEffects } from './+state/effects';
import { reducer, SALES_DATA_WIDGET_FEATURE_KEY } from './+state/reducer';
import { SalesDataWidgetComponent } from './sales-data-widget.component';
@NgModule({
  declarations: [SalesDataWidgetComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(SALES_DATA_WIDGET_FEATURE_KEY, reducer),
    EffectsModule.forFeature([SalesDataWidgetEffects])
  ],
  exports: [SalesDataWidgetComponent],
})
export class SalesDataWidgetModule { }
