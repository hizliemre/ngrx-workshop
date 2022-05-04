import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getDataActions } from './+state/actions';
import { salesDataWidgetSelectors, SalesDataWidgetViewModel } from './+state/selectors';

@Component({
  selector: 'sales-data-widget',
  templateUrl: './sales-data-widget.component.html',
})
export class SalesDataWidgetComponent implements OnInit {

  @Input() category: string = '';

  viewModel$: Observable<SalesDataWidgetViewModel>;

  constructor(private readonly _store: Store) { }

  ngOnInit(): void {
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
