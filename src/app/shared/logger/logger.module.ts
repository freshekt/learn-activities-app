import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerComponent } from './components/logger.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [LoggerComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    LoggerComponent
  ]
})
export class LoggerModule { }
