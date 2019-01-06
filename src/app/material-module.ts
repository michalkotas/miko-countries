import {NgModule} from '@angular/core';
import {
  MdButtonModule, MdCardModule, MdChipsModule, MdIconModule, MdInputModule, MdListModule, MdPaginatorModule,
  MdProgressBarModule,
  MdSidenavModule, MdTableModule, MdToolbarModule,
} from '@angular/material';
@NgModule({
  exports: [
    MdButtonModule,
    MdCardModule,
    MdChipsModule,
    MdTableModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdSidenavModule,
    MdToolbarModule,
  ]
})
export class MaterialModule {}
