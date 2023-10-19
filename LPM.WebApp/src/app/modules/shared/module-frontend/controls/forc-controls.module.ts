import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextControlComponent } from './forc-text/textControl.component';
import { CommonModule } from '@angular/common';
import { EmailControlComponent } from './forc-email/emailControl.component';
import { NumberControlComponent } from './forc-number/numberControl.component';
import { CheckBoxControlComponent } from './forc-checkbox/checkBoxControl.component';
import { PasswordControlComponent } from './forc-password/passwordControlComponent';
import { DateTimeControlComponent } from './forc-date/dateTimeControl.component';
import { TextAreaControlComponent } from './forc-textArea/textAreaControl.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [
		TextControlComponent,
		PasswordControlComponent,
		EmailControlComponent,
		NumberControlComponent,
		CheckBoxControlComponent,
		DateTimeControlComponent,
		TextAreaControlComponent
	],
	exports: [
		TextControlComponent,
		PasswordControlComponent,
		EmailControlComponent,
		NumberControlComponent,
		CheckBoxControlComponent,
		DateTimeControlComponent,
		TextAreaControlComponent
	],
	providers: [

	]
})
export class ForcControlsModule {

}