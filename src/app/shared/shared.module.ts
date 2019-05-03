import { IonicModule } from '@ionic/angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlipTimerComponent } from './flip-timer/flip-timer.component';
import { CountdownModule } from 'ngx-countdown';

@NgModule({
  declarations: [FlipTimerComponent],
  imports: [
    CommonModule,
    CountdownModule,
    IonicModule
  ],
  exports: [FlipTimerComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class SharedModule { }
