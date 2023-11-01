import { NgModule } from '@angular/core';
import { SelectSingleComponent } from './select-single/select-single.component';
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