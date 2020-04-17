import { ActivityModule } from './../activity/activity.module';
import { LoginModule } from './../login/login.module';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FullCalendarModule} from 'primeng/fullcalendar';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    LoginModule,
    FullCalendarModule,
    ActivityModule
  ]
})
export class MainModule { }
