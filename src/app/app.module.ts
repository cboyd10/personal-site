import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SvgService } from './common/svg.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LottieModule.forRoot({player: playerFactory}),
    HomeComponent,
    BrowserAnimationsModule
  ],
  providers: [
    SvgService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
