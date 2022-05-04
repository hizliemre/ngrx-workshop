import { Component, Input, OnInit } from '@angular/core';
import { EffectSources } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getDataActions } from './+state/actions';
import { SalesDataWidgetEffects } from './+state/effects';
import { salesDataWidgetSelectors, SalesDataWidgetViewModel } from './+state/selectors';

@Component({
  selector: 'sales-data-widget',
  templateUrl: './sales-data-widget.component.html',
  providers: [SalesDataWidgetEffects]
})
export class SalesDataWidgetComponent implements OnInit {

  @Input() category: string = '';

  viewModel$: Observable<SalesDataWidgetViewModel>;

  constructor(
    private readonly _store: Store,
    private readonly _effects: SalesDataWidgetEffects,
    private readonly _effectSources: EffectSources
  ) { }

  ngOnInit(): void {
    this._effects.init(this.category);
    this._effectSources.addEffects(this._effects);
    this.initAsyncs();
    this.refresh();
  }

  refresh(): void {
    this._store.dispatch(getDataActions.getData({ identifier: this.category, category: this.category }));
  }

  private initAsyncs(): void {
    this.viewModel$ = this._store.select(salesDataWidgetSelectors.selectViewModel);
  }
}
