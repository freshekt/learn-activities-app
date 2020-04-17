import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerComponent } from './components/logger.component';



@NgModule({
  declarations: [LoggerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LoggerComponent
  ]
})
export class LoggerModule { }
