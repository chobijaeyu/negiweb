import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { negifield } from 'src/app/models/field.model';
import { NegifieldService } from 'src/app/services/negifield.service';
import { FieldAddComponent } from '../components/field-add/field-add.component';
import { FieldEditComponent } from '../components/field-edit/field-edit.component';

@Component({
  selector: 'negi-field-container',
  templateUrl: './field-container.component.html',
  styleUrls: ['./field-container.component.sass']
})
export class FieldContainerComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['field_name', 'group_name'];
  dataSource!: MatTableDataSource<negifield>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private nf: NegifieldService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.nf.getAll()
    this.nf.entities$.subscribe(r => {
      this.dataSource = new MatTableDataSource(r)
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;    
  }

  openNewFieldDialog() {
    const dr = this.dialog.open(FieldAddComponent, {})

    dr.afterClosed().subscribe(field => {
      if (field) {
        //ng data add new field to server
        this.nf.add(field)
      }
    }
    )
  }

  openEditDialog() {
    const dr = this.dialog.open(FieldEditComponent, {})

    dr.afterClosed().subscribe(field => {
      if (field) {
        //ng data edit field to server
        this.nf.update(field)
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
