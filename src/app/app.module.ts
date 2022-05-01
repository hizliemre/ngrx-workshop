import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Dashboard1Component } from './dashboard-1/dashboard-1.component';
import { Dashboard2Component } from './dashboard-2/dashboard-2.component';
import { Database } from './database';
import { SalesDataWidgetComponent } from './sales-data-widget/sales-data-widget.component';


@NgModule({
  declarations: [
    AppComponent,
    Dashboard1Component,
    Dashboard2Component,
    SalesDataWidgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(Database, {
      delay: 2000
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
