import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } form './services/employee.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DataSource } from '@angular/cdk/collections';
import { error } from 'console';
import { CoreService } from './core/core.Service';

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
export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error("Method not implemented. ");
  }
displayedColumns: string[] = [
  'id',
  'firstName',
  'lastName',
  'email',
  'dob',
  'gender',
  'education',
  'company',
  'experience',
  'package',
  'action',
];
DataSource!: MatTableDataSource<any>;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

constructor(
  private _dialog: MatDialog,
  private _empService: EmployeeService,
  private _coreService: CoreService
) {}

ngOnInit(): void{
  this.getEmployeeList();
}

openAddEditEmpForm() {
  const dialogRef = this._dialog.open(EmpAddEditComponent);
  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        this.getEmployeeList();
      }
    },
  });
}
getEmployeeList(){
  this._empService.getEmployeeList().subscribe({
    next: (res) => {
      this.DataSource = new MatTableDataSource(res);
      this.DataSource.sort = this.sort;
      this.DataSource.paginator = this.paginator;
    },
    error: console.log,
  });
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

if (this.dataSource.paginator) {
  this.dataSource.paginator.firstPage();
}
} 
deleteEmployee(id: number) {
  this._empService.deleteEmployee(id).subscribe({
    next: (res) => {
      this._coreService.openSnackBar('Employee deleted', 'done');
      this.getEmployeeList();
    },
    error: console.log,
  });
}

openEditForm(data: any) {
  const dialogRef = this._dialog.open(EmpAddEditComponent, {
    data,
  });

  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        this.getEmployeeList();
      }
    },
  });
}
}

