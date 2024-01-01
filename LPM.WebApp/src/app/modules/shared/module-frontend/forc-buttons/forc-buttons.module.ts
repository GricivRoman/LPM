import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddButtonComponent } from './buttons/add-button.component';
import { EditButtonComponent } from './buttons/edit-button.component';
import { DeleteButtonComponent } from './buttons/delete-button.component';
import { CommonModule } from '@angular/common';
import { FilterButtonComponent } from './buttons/filter-button.component';
import { ExportButtonComponent } from './buttons/export-button.component';

@NgModule({
	imports: [
		FontAwesomeModule,
		CommonModule
	],
	declarations: [
		AddButtonComponent,
		EditButtonComponent,
		DeleteButtonComponent,
		FilterButtonComponent,
		ExportButtonComponent
	],
	exports: [
		AddButtonComponent,
		EditButtonComponent,
		DeleteButtonComponent,
		FilterButtonComponent,
		ExportButtonComponent
	],
	providers: [

	]
})
export class ForcButtonsModule {

}