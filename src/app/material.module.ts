
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';

function setImportAndExport() {
  return [MatButtonModule, MatToolbarModule, MatMenuModule];
}
@NgModule({
  imports: setImportAndExport(),
  exports: setImportAndExport(),
})
export class MaterialModule { }