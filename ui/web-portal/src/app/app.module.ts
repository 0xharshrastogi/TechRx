import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [AppComponent, LoginPageComponent],
	imports: [BrowserModule, AppRoutingModule, SharedModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
