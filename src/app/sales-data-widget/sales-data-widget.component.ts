import { Component, Input, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { IdentifiedEffects } from '../ngrx-infra';
import { SalesDataWidgetEffects } from './+state/effects';
import { SalesDataWidgetComponentState } from './+state/facade';

@Component({
  selector: 'sales-data-widget',
  templateUrl: './sales-data-widget.component.html',
  providers: [
    {
      provide: IdentifiedEffects,
      useClass: SalesDataWidgetEffects
    },
    SalesDataWidgetComponentState
  ]
})
export class SalesDataWidgetComponent implements OnInit {

  @Input() category: string = '';

  private readonly _identifier = Guid.create().toString();

  constructor(readonly state: SalesDataWidgetComponentState) { }

  ngOnInit(): void {
    this.state.init(this._identifier);
    this.refresh();
  }

  refresh(): void {
    this.state.refresh(this.category);
  }

}
