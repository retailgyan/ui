import {MatCardModule,MatGridListModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatCardModule,MatGridListModule],
  exports: [MatCardModule,MatGridListModule]
})
export class CustomMaterialModule { }