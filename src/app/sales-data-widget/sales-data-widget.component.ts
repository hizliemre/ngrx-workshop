import { Component, Input, OnInit } from '@angular/core';
import { EffectSources } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { SalesDataWidgetEffects } from './+state/effects';
import { SalesDataWidgetComponentState } from './+state/facade';
import { salesDataWidgetSelectors, SalesDataWidgetViewModel } from './+state/selectors';

@Component({
  selector: 'sales-data-widget',
  templateUrl: './sales-data-widget.component.html',
  providers: [
    SalesDataWidgetEffects,
    SalesDataWidgetComponentState
  ]
})
export class SalesDataWidgetComponent implements OnInit {

  @Input() category: string = '';

  viewModel$: Observable<SalesDataWidgetViewModel>;

  private readonly _identifier = Guid.create().toString();

  constructor(
    private readonly _store: Store,
    private readonly _effects: SalesDataWidgetEffects,
    private readonly _effectSources: EffectSources,
    private readonly _state: SalesDataWidgetComponentState
  ) { }

  ngOnInit(): void {
    this._state.init(this._identifier);
    this._effects.init(this._identifier);
    this._effectSources.addEffects(this._effects);
    this.initAsyncs();
    this.refresh();
  }

  refresh(): void {
    this._state.refresh(this.category);
  }

  private initAsyncs(): void {
    this.viewModel$ = this._store.select(salesDataWidgetSelectors.selectViewModel(this._identifier));
  }
}
