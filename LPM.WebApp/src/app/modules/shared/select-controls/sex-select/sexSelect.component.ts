import { Component, Inject, OnInit } from '@angular/core';
import { SexSelectService } from './sexSelect.service';
import { SelectComponent } from '../../base-components/selectComponent';
import { SelectItem } from '../../models/selectItem';
import { SexEnumDictionary } from '../../enums/sexEnum';

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
export class SexSelectComponent extends SelectComponent implements OnInit {

	constructor(@Inject('SelectService') public override selectService: SexSelectService){
		super(selectService);
	}

	ngOnInit(){
		this.control.valueChanges.subscribe((sex) => this.setLocalEnumValue(sex));
	}

	setLocalEnumValue(sex: SelectItem){
		this.control.patchValue({
			id: sex.id,
			value: SexEnumDictionary.list.get(sex.id)
		}, {emitEvent: false});
	}
}