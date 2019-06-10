import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormBuilder, FormGroup } from  '@angular/forms';
import { UploadService } from  '../upload.service';
import {Apparel} from '../apparel';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  outputs:['onNewEntryAdded']
})
export class UploadComponent implements OnInit {
  @Input()  apparel: Apparel[];

  @Output()
  public onNewEntryAdded = new EventEmitter();

  form: FormGroup;
  error: string;
  userId: number = 1;
  uploadResponse = { status: '', message: '', filePath: '' };

  constructor(private formBuilder: FormBuilder, private uploadService: UploadService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fileimage: ['']
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('fileimage').setValue(file);

    }    
  }

  onSubmit(event){
    const formData = new FormData();
    formData.append('file', this.form.get('fileimage').value);
    let filename = this.form.get('fileimage').value.name;
    console.log(filename);
    this.uploadService.upload(formData, filename).subscribe(
       (res) => this.uploadResponse = res,
       (err) => this.error = err
     );
  }
}
