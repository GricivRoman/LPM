import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './modules/shared/services/api-interceptor';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthActivatorService } from './modules/personnel-management/authentication/authGuard';
import { AuthenticationService } from './modules/personnel-management/authentication/authentication.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { GlobalOrganizationModule } from './modules/personnel-management/organization/globalOrganization.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FontAwesomeModule,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		HttpClientModule,
		MatDialogModule,
		BrowserAnimationsModule,
		MatMenuModule,
		MatAutocompleteModule,
		MatSelectModule,
		GlobalOrganizationModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ApiInterceptor,
			multi: true,
		},
		AuthActivatorService,
		AuthenticationService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
