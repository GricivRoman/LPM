import { ComponentRef, Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalWindowComponent } from './modalWindow.component';

@Injectable()
export class ModalWindowService {
	constructor(private dialog: NgbModal){
	}
	private componentRef: ComponentRef<any>;

	public openWithCloseButton(
		component: ComponentType<any>,
		title: string = '',
		size: string = 'lg',
		centered: boolean = false,
		initAction: (componentRef: ComponentRef<any>, popupRef: NgbModalRef) => void = () => {},
		closeAction: (componentRef: ComponentRef<any>, popupRef: NgbModalRef) => void = () => {}
	){
		const modalComponent = this.openGeneric(component, title, size, centered, initAction, undefined, '', closeAction).componentInstance as ModalWindowComponent;
		modalComponent.saveButtonVisible = false;
	}

	public openWithTwoButtons(
		component: ComponentType<any>,
		title: string = '',
		size: string = 'lg',
		centered: boolean = false,
		initAction: (componentRef: ComponentRef<any>, popupRef: NgbModalRef) => void = () => {},
		saveAction: (componentRef: ComponentRef<any>, popupRef: NgbModalRef) => void = () => {},
		saveButtonTitle: string = 'Сохранить',
		closeAction: (componentRef: ComponentRef<any>, popupRef: NgbModalRef) => void = () => {}
	){
		this.openGeneric(component, title, size, centered, initAction, saveAction, saveButtonTitle, closeAction);
	}

	public openWithResetSaveCloseButtons(
		component: ComponentType<any>,
		title: string = '',
		size: string = 'lg',
		centered: boolean = false,
		initAction: (componentRef: ComponentRef<any>, popupRef: NgbModalRef) => void = () => {},
		saveAction: (componentRef: ComponentRef<any>, popupRef: NgbModalRef) => void = () => {},
		saveButtonTitle: string = 'Сохранить',
		closeAction: (componentRef: ComponentRef<any>, popupRef: NgbModalRef) => void = () => {},
		resetAction: (componentRef: ComponentRef<any>, popupRef: NgbModalRef) => void = () => {}
	){
		const modalComponent = this.openGeneric(
			component,
			title,
			size,
			centered,
			initAction,
			saveAction,
			saveButtonTitle,
			closeAction,
			resetAction
		).componentInstance as ModalWindowComponent;

		modalComponent.resetButtonVisible = true;
	}

	private openGeneric(
		component: ComponentType<any>,
		title: string = '',
		size: string = 'lg',
		centered: boolean = true,
		initAction: (componentRef: ComponentRef<any>, popupRef: NgbModalRef) => void = () => {},
		saveAction: (componentRef: ComponentRef<any>, popupRef: NgbModalRef) => void = () => {},
		saveButtonTitle: string = 'Сохранить',
		closeAction: (componentRef: ComponentRef<any>, popupRef: NgbModalRef) => void = () => {},
		resetAction: (componentRef: ComponentRef<any>, popupRef: NgbModalRef) => void = () => {}
	): NgbModalRef{
		ModalWindowComponent.componentToWrap = component;
		const dialogRef = this.dialog.open(ModalWindowComponent, {
			centered: centered,
			size: size,
			scrollable: true
		});

		const popupWindowInstance = dialogRef.componentInstance as ModalWindowComponent;
		popupWindowInstance.title = title;
		popupWindowInstance.saveButtonTitle = saveButtonTitle;

		dialogRef.shown.subscribe(() => {
			this.componentRef = dialogRef.componentInstance.inerRef._componentRef;

			popupWindowInstance.save = () => {
				saveAction(this.componentRef,dialogRef);
			};
			popupWindowInstance.close = () => {
				closeAction(this.componentRef,dialogRef);
			};

			popupWindowInstance.reset = () => {
				resetAction(this.componentRef,dialogRef);
			};

			initAction(this.componentRef,dialogRef);
		});

		return dialogRef;
	}
}