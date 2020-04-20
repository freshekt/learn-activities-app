import { DatabaseModule } from './../shared/database/database.module';

import { LoginModule } from './../login/login.module';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './components/main/activities.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FullCalendarModule} from 'primeng/fullcalendar';
import { ActivityFormComponent } from './components/activity-form/activity-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ActivitiesComponent, ActivityFormComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DatabaseModule,
    ClarityModule,
    LoginModule,
    FullCalendarModule
  ]
})
export class MainModule { }
