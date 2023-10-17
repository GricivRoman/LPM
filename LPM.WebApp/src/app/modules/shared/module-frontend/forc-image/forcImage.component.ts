import { Component, Input, Output, EventEmitter, OnInit, Inject } from '@angular/core';
import { Guid } from 'guid-typescript';
import { FileStorageService } from '../../services/fileStorage.service';
import { EntityWithImage } from '../../models/entityWithImage';

@Component({
	selector: 'app-forc-image',
	templateUrl: 'forcImage.component.html',
	styleUrls: ['forcImage.component.css'],
	providers: [{provide: 'FileStorage', useClass: FileStorageService}]
})
export class ForcImageComponent implements OnInit {
	public picture: string = 'assets/images/LoadingPicture.jpg';
	public selectedFile: File;

	@Input()
		apiUrl: string;

	@Output() fileChanged = new EventEmitter<File>;

	constructor(@Inject('FileStorage') private fileStorageService: FileStorageService){
	}

	ngOnInit(): void {
		this.fileStorageService.url = this.apiUrl;
	}

	public setPicture(model: EntityWithImage){
		if(model?.id && model.hasPhoto) {
			this.fileStorageService.get(model.id).subscribe({
				next: (data: any) => {
					this.picture = `data:image/jpg;base64,${data.file}`;
				}
			});
		} else {
			this.picture = 'assets/images/UploadPicture.jpg';
		}
	}

	public photoChanges(event: any){
		const filesList = event.target.files;
		if(filesList){
			this.picture = window.URL.createObjectURL(filesList[0]);
			this.selectedFile = filesList[0];
			this.fileChanged.emit(this.selectedFile);
		}
	}

	public Save = (id: Guid) => {
		if(id){
			const formData = new FormData();
			formData.append('File', this.selectedFile, this.selectedFile.name);
			formData.append('Id', id.toString());
			this.fileStorageService.save(formData).subscribe();
		}
	};
}