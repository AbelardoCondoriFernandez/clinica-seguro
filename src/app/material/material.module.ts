import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatListModule} from '@angular/material/list';
import {MatNativeDateModule} from '@angular/material/core';
import {MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorImpl } from '../_shader/mat-paginator';
import {MatExpansionModule} from '@angular/material/expansion';
@NgModule({
    imports: [
      
      CommonModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatIconModule,
      MatMenuModule,
      MatSidenavModule,
      MatDividerModule,
      MatToolbarModule,
      MatFormFieldModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatInputModule,
      MatCardModule,
      MatSnackBarModule,
      MatDialogModule,
      MatSelectModule,
      MatDatepickerModule,
      MatListModule,
      MatExpansionModule,
      MatNativeDateModule,
      MatAutocompleteModule
    ],
    exports: [
      MatButtonModule,
      MatIconModule,
      MatMenuModule,
      MatSidenavModule,
      MatDividerModule,
      MatToolbarModule,
      MatFormFieldModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatInputModule,
      MatCardModule,
      MatSnackBarModule,
      MatDialogModule,
      MatSelectModule,
      MatDatepickerModule,
      MatListModule,
      MatExpansionModule,
      MatNativeDateModule,
      MatAutocompleteModule
    ],
    providers:[{provide:MatPaginatorIntl,useClass:MatPaginatorImpl}],
    declarations: []
  })
  export class MaterialModule { }
  