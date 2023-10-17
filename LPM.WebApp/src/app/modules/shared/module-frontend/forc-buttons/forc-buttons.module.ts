import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddButtonComponent } from './buttons/add-button.component';
import { EditButtonComponent } from './buttons/edit-button.component';
import { DeleteButtonComponent } from './buttons/delete-button.component';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		FontAwesomeModule,
		CommonModule
	],
	declarations: [
		AddButtonComponent,
		EditButtonComponent,
		DeleteButtonComponent
	],
	exports: [
		AddButtonComponent,
		EditButtonComponent,
		DeleteButtonComponent
	],
	providers: [

	]
})
export class ForcButtonsModule {

}