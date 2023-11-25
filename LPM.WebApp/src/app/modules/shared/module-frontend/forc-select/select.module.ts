import { NgModule } from '@angular/core';
import { SelectComponent } from './selector/select.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { RequiredStarModule } from '../requiredStar/requiredStar.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule,
		RequiredStarModule
	],
	declarations: [
		SelectComponent
	],
	exports: [
		SelectComponent
	],
	providers: [

	]
})
export class SelectModule {

}