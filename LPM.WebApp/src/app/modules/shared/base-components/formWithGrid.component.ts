import { Component, ViewChild, Input, Output, EventEmitter, ComponentRef, Inject } from '@angular/core';
import { BaseEntity } from "../models/baseEntity";
import { GridComponent } from "../module-frontend/forc-grid/grid.component";
import { Guid } from 'guid-typescript';
import { ModalWindowService } from '../module-frontend/forc-popup/modalWindow.service';
import { DataService } from '../services/data.service';
import { AlertService } from '../module-frontend/forc-alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertDialogStates } from '../module-frontend/forc-alert/alertDialogStates';
import { GridDataService } from '../module-frontend/forc-grid/grid-data.service';
import { GridOptionsService } from '../module-frontend/forc-grid/grid-options.service';

@Component({
    selector: 'app-form-with-grid',
    template: ''
})
export abstract class FormWithGridComponent<TModel extends BaseEntity> {
    @ViewChild(GridComponent, {static: false}) grid : GridComponent<TModel>;

    public addButtonDisabled = false;
    public editButtonDisabled = false;
    public deleteButtonDisabled = false;

    @Input()
    public userId?: Guid;

	@Output() dataLoaded = new EventEmitter<TModel[]>;
    
    public gridOptionService: GridOptionsService;
    public gridDataService: GridDataService<TModel>;
	
    constructor(
        public modalService: ModalWindowService,
		public dataService: DataService<TModel>,
		public alertService: AlertService
	){
	}

	abstract add(): void;

	abstract edit(): void;

	delete(){
		this.dataService.delete(this.grid.getSelectedRowsKeys()[0]).subscribe({
			next: () => {
				this.grid.refresh();
			},
			error: (errResponse: HttpErrorResponse) => {
				console.error(errResponse);
				this.alertService.showMessage(JSON.stringify(errResponse.error), AlertDialogStates.error);
			}
		});
	}

	onRowDoubleClick = () => {
		this.edit();
	};

	gridDataLoaded(data: TModel[]){
		this.dataLoaded.emit(data);
	}

	setApiUrl(componentRef: ComponentRef<any>){
		componentRef.instance.apiUrl = this.dataService.url;
		componentRef.instance.refreshDataServiceUrl();
	}
}