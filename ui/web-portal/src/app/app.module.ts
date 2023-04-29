import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { SignupPageComponent } from './page/signup-page/signup-page.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [AppComponent, LoginPageComponent, SignupPageComponent],
	imports: [BrowserModule, HttpClientModule, ReactiveFormsModule, AppRoutingModule, SharedModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
