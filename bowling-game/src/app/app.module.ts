import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FrameComponent } from './components/frame/frame.component';
import { ScoreInputComponent } from './components/score-input/score-input.component';

@NgModule({
  declarations: [
    AppComponent,
    FrameComponent,
    ScoreInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
