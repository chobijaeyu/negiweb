import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { titleOption } from 'src/app/models/title-options.model';
import { CustomTaskTitleOptionService } from 'src/app/services/custom-task.service';
import { ConfirmDialogComponent } from '../../share/components/confirm-dialog/confirm-dialog.component';
import { AddTitleDialogComponent } from '../components/add-title-dialog/add-title-dialog.component';
import { EditTitleDialogComponent } from '../components/edit-title-dialog/edit-title-dialog.component';

@Component({
  selector: 'negi-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleOptionsContainerComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'title', 'action'];
  dataSource!: MatTableDataSource<titleOption>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  titleOptions: titleOption[] = []

  constructor(
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
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

  onAddTitleOption() {
    const dr = this.dialog.open(AddTitleDialogComponent, {})
    dr.afterClosed().subscribe(titleOption => {
      if (titleOption) {
        this.titleOptionsService.add(titleOption).subscribe(r => {
          this.snackbar.open(titleOption.title + ">>> 登録しました", "X", { duration: 5000 })
        },
          err => {
            console.error(err)
            this.snackbar.open("登録失敗", "X", { duration: 5000 })
          })
      }
    })
  }

  onEditTitleOption(titleOption: titleOption, ev: MouseEvent) {
    ev.stopPropagation()
    const dr = this.dialog.open(EditTitleDialogComponent, { data: titleOption })

    dr.afterClosed().subscribe(to => {
      if (to) {
        this.titleOptionsService.update(to).subscribe(r => {
          this.snackbar.open(to.title + ">>> 更新しました", "X", { duration: 5000 })
        },
          err => {
            console.error(err)
            this.snackbar.open("更新失敗", "X", { duration: 5000 })
          }
        )
      }
    })
  }

  onDelete(titleOption: titleOption, ev: MouseEvent) {
    ev.stopPropagation()
    this.dialog.open(ConfirmDialogComponent, { data: { title: "タスクタイトルを削除する" } }).afterClosed().subscribe(r => {
      if (r) {
        this.titleOptionsService.delete(titleOption).subscribe(r => {
          this.snackbar.open(`${r}削除しました`, "X", { duration: 5000 })
        },
          err => {
            console.error(err)
            this.snackbar.open("削除失敗", "X", { duration: 5000 })
          })
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
