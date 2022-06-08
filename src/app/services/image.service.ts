import { environment } from './../../environments/environment';
import { Observable, scan } from 'rxjs';
import { HttpClient, HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Upload } from '../type/upload';


function isHttpResponse<T>(event: HttpEvent<T>): event is HttpResponse<T> {
  return event.type === HttpEventType.Response
}

function isHttpProgressEvent(
  event: HttpEvent<unknown>
): event is HttpProgressEvent {
  return (
    event.type === HttpEventType.DownloadProgress ||
    event.type === HttpEventType.UploadProgress
  )
}
@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }
  uploadImage(file: any): Observable<any> {
    // const initialState: Upload = { state: 'PENDING', progress: 0 }
    // const calculateState = (
    //   upload: Upload,
    //   event: HttpEvent<unknown>
    // ): Upload => {
    //   if (isHttpProgressEvent(event)) {
    //     return {
    //       progress: event.total
    //         ? Math.round((100 * event.loaded) / event.total)
    //         : upload.progress,
    //       state: 'IN_PROGRESS',
    //     }
    //   }
    //   if (isHttpResponse(event)) {
    //     return {
    //       progress: 100,
    //       state: 'DONE',
    //     }
    //   }
    //   return upload
    // }
    return this.http.post<any>(`${environment.image}`, file, { reportProgress: true, observe: 'events' })
  }
}
