import { Component, Input, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { provideIdentifiedState } from '../ngrx-infra';
import { SalesDataWidgetEffects } from './+state/effects';
import { SalesDataWidgetComponentState } from './+state/facade';

@Component({
  selector: 'sales-data-widget',
  templateUrl: './sales-data-widget.component.html',
  providers: [
    provideIdentifiedState(SalesDataWidgetComponentState, SalesDataWidgetEffects)
  ]
})
export class SalesDataWidgetComponent implements OnInit {

  @Input() category: string = '';

  private readonly _identifier = Guid.create().toString();

  constructor(public readonly state: SalesDataWidgetComponentState) { }

  ngOnInit(): void {
    this.state.init(this._identifier);
    this.refresh();
  }

  refresh(): void {
    this.state.refresh(this.category);
  }

}
