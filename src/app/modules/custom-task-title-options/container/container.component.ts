import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { titleOption } from 'src/app/models/title-options.model';
import { CustomTaskTitleOptionService } from 'src/app/services/custom-task.service';

@Component({
  selector: 'negi-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleOptionsContainerComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'title'];
  dataSource!: MatTableDataSource<titleOption>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  titleOptions: titleOption[] = []

  constructor(
    public titleOptionsService: CustomTaskTitleOptionService,
  ) {
  }

  ngOnInit(): void {
    this.titleOptionsService.getAll()
    this.titleOptionsService.entities$.subscribe(titleOptions => {
      this.dataSource = new MatTableDataSource(titleOptions);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
