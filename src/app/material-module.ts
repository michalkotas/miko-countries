import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule,
  MatProgressBarModule,
  MatSidenavModule, MatTableModule, MatToolbarModule,
} from '@angular/material';
@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatToolbarModule,
  ]
})
export class MaterialModule {}
