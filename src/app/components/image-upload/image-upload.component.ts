import { HttpResponse, HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Input() images: string[] = [];
  @Input() limit: string = "";
  @Output() imageHandle: EventEmitter<any>;
  @Output() stateHandle: EventEmitter<any>;
  upload: { progress: number } = { progress: 0 }

  constructor(private imageService: ImageService) {
    this.imageHandle = new EventEmitter();
    this.stateHandle = new EventEmitter();
  }
  ngOnInit(): void {
  }
  uploadHandle(event: any) {
    this.stateHandle.emit(true);
    let fileList: FileList = event.target.files;
    let file: File = fileList[0];
    let formData: FormData = new FormData();
    formData.append('image', file, file.name);
    let headers = new Headers();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.imageService.uploadImage(formData).subscribe({
      next: (data: HttpEvent<any>) => {
        if (data.type === HttpEventType.UploadProgress) {
          this.upload.progress = Math.round(100 * data.loaded / (data.total ?? 1));
        } else if (data instanceof HttpResponse) {
          this.stateHandle.emit(false);
          this.upload.progress = 0;
          this.images.push(data.body);
          this.imageHandle.emit(this.images);
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(false);
      }
    })
  };
  removeImage(image: string) {
    this.images = this.images.filter(item => item != image);
    this.imageHandle.emit(this.images);
  }
}
