import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RowComponent } from './row/row.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { TableWrapperComponent } from './table-wrapper/table-wrapper.component';
import { TimelineChartComponent } from './timeline-chart/timeline-chart.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RowComponent,
    PaginatorComponent,
    TableWrapperComponent,
    TimelineChartComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
