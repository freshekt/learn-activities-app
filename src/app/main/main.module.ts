import { DatabaseModule } from './../shared/database/database.module';
import { LoginModule } from './../login/login.module';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './components/main/activities.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NguiMapModule} from '@ngui/map';
import {FullCalendarModule} from 'primeng/fullcalendar';
import { ActivityFormComponent } from './components/activity-form/activity-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivityItemComponent } from './components/activity-item/activity-item.component';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';

@NgModule({
  declarations: [ActivitiesComponent, ActivityFormComponent, ActivityItemComponent, AutocompleteComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DatabaseModule,
    ClarityModule,
    LoginModule,
    FullCalendarModule,

    NguiMapModule.forRoot({
      apiUrl: 'https://maps.google.com/maps/api/js?libraries=places&language=ru&key=AIzaSyBXu8OmeuVHvYLBXbwW2Eh-r7BM-h6Rm4E'
    })
  ]
})
export class MainModule { }
