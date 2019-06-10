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
  error: string;

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.uploadService.loaddata().subscribe(
      (res) => this.apparel = res,
      (err) => this.error = err
    );
  }
}
