
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';


function setImportAndExport() {
  return [
    MatButtonModule, 
    MatToolbarModule, 
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ];
}
@NgModule({
  imports: setImportAndExport(),
  exports: setImportAndExport(),
})
export class MaterialModule { }