import { Component, Input, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { ComponentEffects } from '../ngrx-infra';
import { SalesDataWidgetEffects } from './+state/effects';
import { SalesDataWidgetComponentState } from './+state/facade';
import { SalesDataWidgetViewModel } from './+state/selectors';

@Component({
  selector: 'sales-data-widget',
  templateUrl: './sales-data-widget.component.html',
  providers: [
    SalesDataWidgetComponentState,
    {
      provide: ComponentEffects,
      useClass: SalesDataWidgetEffects
    }
  ]
})
export class SalesDataWidgetComponent implements OnInit {

  @Input() category: string = '';

  viewModel$: Observable<SalesDataWidgetViewModel>;

  private readonly _identifier = Guid.create().toString();

  constructor(private readonly _state: SalesDataWidgetComponentState) { }

  ngOnInit(): void {
    this._state.init(this._identifier);
    this.viewModel$ = this._state.viewModel$;
    this.refresh();
  }

  refresh(): void {
    this._state.refresh(this.category);
  }

}
