import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SexSelectService } from './sexSelect.service';

@Component({
	selector: 'app-select-sex',
	template: `
        <app-select-single
            [label]="label"
            [control]="control"
            [selectService]="selectService"
        ></app-select-single>
    `,
	providers:[SexSelectService]
})
export class SexSelectComponent {

	@Input()
		label:string = 'Label required';

	@Input()
		control: FormControl;

	constructor(public selectService: SexSelectService){
	}
}