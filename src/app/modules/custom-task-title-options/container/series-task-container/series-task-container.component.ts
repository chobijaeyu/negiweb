import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { seriesTaskOption } from 'src/app/models/task-options.model';
import { ConfirmDialogComponent } from 'src/app/modules/share/components/confirm-dialog/confirm-dialog.component';
import { CustomSeriesTaskOptionService } from 'src/app/services/custom-task.service';
import { AddSeriesTaskComponent } from '../../components/add-series-task/add-series-task.component';
import { EditSeriesTaskComponent } from '../../components/edit-series-task/edit-series-task.component';

@Component({
  selector: 'negi-series-task-container',
  templateUrl: './series-task-container.component.html',
  styleUrls: ['./series-task-container.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesTaskContainerComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'title', 'action'];
  dataSource!: MatTableDataSource<seriesTaskOption>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public CDR: ChangeDetectorRef,
    public stos: CustomSeriesTaskOptionService,
  ) { }

  ngOnInit(): void {
    this.stos.getAll()
    this.stos.entities$.pipe(map(seriestaskop => { this.dataSource = new MatTableDataSource(seriestaskop), this.CDR.markForCheck() })).subscribe()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  onAddSeriesTaskOption() {
    const dr = this.dialog.open(AddSeriesTaskComponent, {})
    dr.afterClosed().pipe(switchMap(to => {
      if (!to) {
        return of()
      }
      return this.stos.add(to).pipe(tap(r => {
        this.snackbar.open(r.title + ">>> 登録しました", "X", { duration: 5000 })
      },
        err => {
          console.error(err)
          this.snackbar.open("登録失敗", "X", { duration: 5000 })
        }))
    })).subscribe()
  }

  onEditSeriesTaskOption(seriestaskop: seriesTaskOption, ev: MouseEvent) {
    ev.stopPropagation()
    const dr = this.dialog.open(EditSeriesTaskComponent, { data: seriestaskop })

    dr.afterClosed().pipe(switchMap(to => {
      if (!to) {
        return of()
      }
      return this.stos.update(to).pipe(tap(r => {
        this.snackbar.open(to.title + ">>> 更新しました", "X", { duration: 5000 })
      },
        err => {
          console.error(err)
          this.snackbar.open("更新失敗", "X", { duration: 5000 })
        }))
    })).subscribe()
  }

  onDelete(seriestaskop: seriesTaskOption, ev: MouseEvent) {
    ev.stopPropagation()
    this.dialog.open(ConfirmDialogComponent, { data: { title: "タスクタイトルを削除する" } }).afterClosed().pipe(switchMap(r => {
      if (r) {
        return this.stos.delete(seriestaskop).pipe(tap(result => {
          this.snackbar.open(`${result}削除しました`, "X", { duration: 5000 })
        },
          err => {
            console.error(err)
            this.snackbar.open("削除失敗", "X", { duration: 5000 })
          }))
      }
      return of({})
    })).subscribe()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
