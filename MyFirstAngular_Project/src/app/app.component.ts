import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
//import { AppComponent } from './app.component';
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
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    MatSnackBarModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.')
  }
  displayedColumns: string[] = [
    'id', 'firstName', 'lastName', 'email', 'dob', 'gender', 'education', 'company', 'experience', 'package', 'action'
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.employeeService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error(err)
    });
  }

  openAddEditEmpForm() {
    const dialogRef = this.dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) this.getEmployeeList();
      }
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
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.coreService.openSnackBar('Employee deleted', 'done');
        this.getEmployeeList();
      },
      error: (err) => console.error(err)
    });
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(EmpAddEditComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) this.getEmployeeList();
      }
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