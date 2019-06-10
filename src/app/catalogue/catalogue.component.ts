import { Component, OnInit } from '@angular/core';
import { Apparel } from '../apparel';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  apparel:Apparel[]
  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.apparel = this.uploadService.loaddata();
  }

}
