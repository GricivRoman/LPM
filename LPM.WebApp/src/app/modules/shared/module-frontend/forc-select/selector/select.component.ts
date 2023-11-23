import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from '../../../models/selectItem';
import { SelectService } from '../select.service';
import { first } from 'rxjs';
import { BaseControlComponent } from '../../controls/baseControl.component';

@Component({
	selector: 'app-select',
	templateUrl: 'select.component.html',
	styleUrls: ['select.component.css']
})
export class SelectComponent extends BaseControlComponent implements OnInit {

	@Input()
		selectService: SelectService;

	@Input()
		hideLabel: boolean;

	@Input()
		isMultiple: boolean = false;

	public title = '';

	private emptyItem: SelectItem = {
		id: undefined,
		value: '(пусто)'
	};

	private loadingItem: SelectItem = {
		id: undefined,
		value: 'загрузка..'
	};

	selectList: any[] = [this.loadingItem];

	selectorTouched = false;

	override ngOnInit(): void {
		super.ngOnInit();
		this.control.valueChanges.pipe(first()).subscribe({
			next: () => {
				if(this.selectorTouched){
					return;
				}
				if(this.control.value) {
					if(!this.control?.value.length) {
						this.selectList = [this.control.value as SelectItem];
					} else {
						this.selectList = this.control.value as SelectItem[];
					}
				}
			}
		});

		this.control.valueChanges.subscribe(() => this.setTitle());
	}

	selectorOpened() {
		this.selectorTouched = true;
		this.selectService.getItemList().subscribe({
			next: (items: SelectItem[]) => {
				if(items.length > 0){
					const itemsToPush = items.filter(x => !this.selectList.includes(x) && this.selectList.find(i => i.id === x.id && i.value === x.value) == null);
					console.log(itemsToPush);
					this.selectList = this.selectList.concat(itemsToPush).filter(x => x.id !== undefined );
				} else {
					this.selectList = [this.emptyItem];
				}
			}
		});
	}

	setTitle(){
		if(this.isMultiple){
			const values = (this.control.value as SelectItem[]).map(x => x.value);
			this.title = values.join(', ');
		} else {
			this.title = (this.control.value as SelectItem).value;
		}
	}

	resetSelectList(){
		this.selectList = [this.loadingItem];
	}
}