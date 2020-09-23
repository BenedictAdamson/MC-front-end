import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WINDOW_PROVIDERS } from './window-providers';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { SelfComponent } from './self/self.component';

@NgModule({
	imports: [
		BrowserModule,
		CommonModule,
		AppRoutingModule,
		HttpClientModule,
		RouterModule
	],
	declarations: [
		AppComponent,
		UsersComponent,
		UserComponent,
		HomeComponent,
		SelfComponent
	],
	providers: [
		WINDOW_PROVIDERS
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
