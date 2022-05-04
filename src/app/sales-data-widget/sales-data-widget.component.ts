import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Guid } from "guid-typescript";
import { Observable } from 'rxjs';
import { getDataActions } from './+state/actions';
import { SalesDataWidgetEffects } from './+state/effects';
import { salesDataWidgetSelectors, SalesDataWidgetViewModel } from './+state/selectors';

@Component({
  selector: 'sales-data-widget',
  templateUrl: './sales-data-widget.component.html',
  providers: [
    SalesDataWidgetEffects
  ]
})
export class SalesDataWidgetComponent implements OnInit {

  @Input() category: string = '';

  viewModel$: Observable<SalesDataWidgetViewModel>;

  private readonly _identifier = Guid.create().toString();

  constructor(
    private readonly _store: Store,
    private readonly _effects: SalesDataWidgetEffects,
  ) { }

  ngOnInit(): void {
    this._effects.init(this._identifier);
    this.initAsyncs();
    this.refresh();
  }

  refresh(): void {
    this._store.dispatch(getDataActions.getData({ category: this.category }));
  }

  private initAsyncs(): void {
    this.viewModel$ = this._store.select(salesDataWidgetSelectors.selectViewModel);
  }
}
