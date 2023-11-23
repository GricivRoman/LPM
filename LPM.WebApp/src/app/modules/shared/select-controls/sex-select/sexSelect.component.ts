import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { SexSelectService } from './sexSelect.service';
import { BaseSelector } from '../../base-components/selectComponent';
import { SelectItem } from '../../models/selectItem';
import { SexEnumDictionary } from '../../enums/sexEnum';
import { SelectComponent } from '../../module-frontend/forc-select/selector/select.component';

@Component({
	selector: 'app-select-sex',
	template: `
        <app-select
            [label]="label"
            [control]="control"
            [selectService]="selectService"
        ></app-select>
    `,
	providers:[{ provide: 'SelectService', useClass: SexSelectService }]
})
export class SexSelectComponent extends BaseSelector implements OnInit {
	@ViewChild(SelectComponent, {static: false}) selector: SelectComponent;

	constructor(@Inject('SelectService') public override selectService: SexSelectService){
		super(selectService);
	}

	ngOnInit(){
		this.control.valueChanges.subscribe((sex) => this.setLocalEnumValue(sex));
	}

	setLocalEnumValue(sex: SelectItem){
		if(this.selector.selectorTouched){
			return;
		}

		this.control.patchValue({
			id: sex.id,
			value: SexEnumDictionary.list.get(sex.id)
		}, {emitEvent: false});
	}
}