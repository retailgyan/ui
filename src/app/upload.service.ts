import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import { Apparel } from './apparel';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  SERVER_URL: string = "http://retailgyan.eastus.cloudapp.azure.com:8080";

  constructor(private httpClient: HttpClient) { } 
  apparel:Apparel[] 

  public upload(data, filename) {
    console.log(filename);
    let uploadURL = `${this.SERVER_URL}/image/`+filename;
    return this.httpClient.post<any>(uploadURL, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }


  public loaddata(){
    let fetchURL = `${this.SERVER_URL}/data`;
    return this.httpClient.get<any>(fetchURL, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  } 
}
