import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';
import { Apparel } from './apparel';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  SERVER_URL: string = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  public upload(data, userId) {
    let uploadURL = `${this.SERVER_URL}/image`;

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

  apparel:Apparel[] = [
    {
      "name": "Zipper A-line",
      "imgsrc": "assets/img_00000055.jpg",
      "category":"Pants",
      "caption":"Maroon solid woven top with crochet detail, has a boat neck, three-quarter bell sleeves"
    },
    {
      "name": "Coke Studio Shirt",
      "imgsrc": "assets/img_00000020.jpg" ,
      "category":"Top",
      "caption":"Maroon solid woven top with crochet detail, has a boat neck, three-quarter bell sleeves"
    },
    {
      "name": "Zipper midline",
      "imgsrc": "assets/img_00000019.jpg" ,
      "category":"Shirt",
      "caption":"Maroon solid woven top with crochet detail, has a boat neck, three-quarter bell sleeves"
    }
  ]
  public loaddata(){
    return this.apparel;
  }

  public update(apparel:Apparel){
    this.apparel = this.apparel.concat(apparel);
  }
  
}
