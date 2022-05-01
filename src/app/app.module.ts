import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Dashboard1Component } from './dashboard-1/dashboard-1.component';
import { Dashboard2Component } from './dashboard-2/dashboard-2.component';

@NgModule({
  declarations: [
    AppComponent,
    Dashboard1Component,
    Dashboard2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
