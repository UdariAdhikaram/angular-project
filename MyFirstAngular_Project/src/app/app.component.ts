import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
//import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
            MatFormFieldModule, 
            MatIconModule, 
            MatToolbarModule, 
            MatButtonModule, 
            MatDialogModule, 
            MatInputModule, 
            MatDatepickerModule, 
            NativeDateModule, 
            MatRadioModule,
            MatSelectModule,
            ReactiveFormsModule,
            HttpClientModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,
            MatSnackBarModule,
          ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MyFirstAngular_Project';
}
