import { LoggerModule } from './../shared/logger/logger.module';
import { DatabaseModule } from './../shared/database/database.module';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityFormComponent } from './components/activity-form/activity-form.component';



@NgModule({
  declarations: [ActivityFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    LoggerModule,
    DatabaseModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    DatabaseModule,
    ActivityFormComponent
  ]
})
export class ActivityModule { }
