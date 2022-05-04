import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SalesDataWidgetEffects } from './+state/effects';
import { salesDataWidgetFeature } from './+state/reducer';
import { SalesDataWidgetComponent } from './sales-data-widget.component';
@NgModule({
  declarations: [SalesDataWidgetComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(salesDataWidgetFeature),
    EffectsModule.forFeature([SalesDataWidgetEffects])
  ],
  exports: [SalesDataWidgetComponent],
})
export class SalesDataWidgetModule { }
