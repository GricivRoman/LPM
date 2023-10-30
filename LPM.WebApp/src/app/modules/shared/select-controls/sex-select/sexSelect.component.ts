import { Component, Inject } from '@angular/core';
import { SexSelectService } from './sexSelect.service';
import { SelectComponent } from '../../base-components/selectComponent';

@Component({
	selector: 'app-select-sex',
	template: `
        <app-select-single
            [label]="label"
            [control]="control"
            [selectService]="selectService"
        ></app-select-single>
    `,
	providers:[{ provide: 'SelectService', useClass: SexSelectService }]
})
export class SexSelectComponent extends SelectComponent {

	constructor(@Inject('SelectService') public override selectService: SexSelectService){
		super(selectService);
	}
}