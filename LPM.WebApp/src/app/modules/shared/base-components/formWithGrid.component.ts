import { Component, ViewChild, Input, Output, EventEmitter, ComponentRef, AfterViewInit } from '@angular/core';
import { BaseEntity } from '../models/baseEntity';
import { GridComponent } from '../module-frontend/forc-grid/grid.component';
import { Guid } from 'guid-typescript';
import { ModalWindowService } from '../module-frontend/forc-popup/modalWindow.service';
import { DataService } from '../services/data.service';
import { AlertService } from '../module-frontend/forc-alert/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertDialogStates } from '../module-frontend/forc-alert/alertDialogStates';
import { GridDataService } from '../module-frontend/forc-grid/grid-data.service';
import { GridOptionsService } from '../module-frontend/forc-grid/grid-options.service';
import { ReactiveFromComponent } from './reactiveForm.component';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ComponentType } from '@angular/cdk/portal';
import { takeUntil } from 'rxjs';

@Component({
	selector: 'app-form-with-grid',
	template: ''
})
export abstract class FormWithGridComponent<TModel extends BaseEntity, TForm extends ReactiveFromComponent<TModel>> implements AfterViewInit {
    @ViewChild(GridComponent, {static: false}) grid : GridComponent<TModel>;

    public addButtonDisabled = false;
    public editButtonDisabled = true;
    public deleteButtonDisabled = true;

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

	ngAfterViewInit(){
		this.grid.onFocusedRowChanged = this.onFocusedRowChanged;
		this.grid.onRowDblClick = this.onRowDoubleClick;
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
				this.alertService.showMessage(errResponse.error.message, AlertDialogStates.error);
			}
		});
	}

	onRowDoubleClick = () => {
		this.edit();
	};

	onFocusedRowChanged = () => {
		const selectedRows = this.grid.getSelectedRowsKeys();

		const disableEditAndDelete = selectedRows.length === 0;
		this.deleteButtonDisabled = disableEditAndDelete;
		this.editButtonDisabled = disableEditAndDelete;
	};

	gridDataLoaded(data: TModel[]){
		this.dataLoaded.emit(data);
	}

	setApiUrl(componentRef: ComponentRef<any>){
		componentRef.instance.apiUrl = this.dataService.url;
		componentRef.instance.refreshDataServiceUrl();
	}

	protected openModal(component: ComponentType<TForm>, title: string, size: string,
		initAction: (componentRef: ComponentRef<TForm>, popupRef: NgbModalRef) => void,
		closeAction: (componentRef: ComponentRef<TForm>, popupRef: NgbModalRef) => void = this.defaultSaveAction
	){
		this.modalService.openWithTwoButtons(
			component,
			title,
			size,
			true,
			(componentRef: ComponentRef<TForm>, popupRef: NgbModalRef) => {
				initAction(componentRef, popupRef);
			},
			(componentRef: ComponentRef<TForm>, popupRef) => {
				closeAction(componentRef, popupRef);
			},
			'Сохранить',
			(componentRef, popupRef) => {
				popupRef.close();
			}
		);
	}

	protected defaultSaveAction = (componentRef: ComponentRef<TForm>, popupRef: NgbModalRef) => {
		componentRef.instance.save(() => {
			this.grid.refresh();
			popupRef.close();
		});
	};

	protected creationWindowInitAction = (componentRef: ComponentRef<TForm>, popupRef: NgbModalRef) => {
		this.defaultInitAction(componentRef, popupRef);
		componentRef.instance.modelId = this.userId;
	};

	protected editingWindowInitAction = (componentRef: ComponentRef<TForm>, popupRef: NgbModalRef) => {
		this.defaultInitAction(componentRef, popupRef);
		componentRef.instance.modelId = this.grid.getSelectedRowsKeys()[0];
		componentRef.instance.ngOnInit();
	};

	protected defaultInitAction(componentRef: ComponentRef<TForm>, popupRef: NgbModalRef){
		this.addValidationChangesListener(componentRef, popupRef);
		this.setApiUrl(componentRef);
	}

	private addValidationChangesListener(componentRef: ComponentRef<TForm>, popupRef: NgbModalRef){
		popupRef.componentInstance.saveButtonDisabled = true;
		const instance = componentRef.instance;
		instance.form.valueChanges.pipe(takeUntil(instance.destroy$)).subscribe(() => {
			popupRef.componentInstance.saveButtonDisabled = !instance.form.valid;
		});
	}
}