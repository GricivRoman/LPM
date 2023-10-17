import { NgModule } from '@angular/core';
import { SelectSingleComponent } from './select-single/select-single.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		SelectSingleComponent
	],
	exports: [
		SelectSingleComponent
	],
	providers: [

	]
})
export class SelectModule {

}