import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { titleOption } from 'src/app/models/task-options.model';
import { ConfirmDialogComponent } from 'src/app/modules/share/components/confirm-dialog/confirm-dialog.component';
import { CustomTaskTitleOptionService } from 'src/app/services/custom-task.service';
import { AddTitleDialogComponent } from '../../components/add-title-dialog/add-title-dialog.component';
import { EditTitleDialogComponent } from '../../components/edit-title-dialog/edit-title-dialog.component';

@Component({
  selector: 'negi-title-option-container',
  templateUrl: './title-option-container.component.html',
  styleUrls: ['./title-option-container.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleOptionContainerComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'title', 'action'];
  dataSource!: MatTableDataSource<titleOption>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  titleOptions: titleOption[] = []

  constructor(
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public CDR: ChangeDetectorRef,
    public titleOptionsService: CustomTaskTitleOptionService,
  ) {
  }

  ngOnInit(): void {
    this.titleOptionsService.getAll()
    this.titleOptionsService.entities$.subscribe(titleOptions => {
      this.CDR.markForCheck()
      this.dataSource = new MatTableDataSource(titleOptions);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onAddTitleOption() {
    const dr = this.dialog.open(AddTitleDialogComponent, {})
    dr.afterClosed().pipe(switchMap(to => {
      if (!to) {
        return of()
      }
      return this.titleOptionsService.add(to).pipe(tap(r => {
        this.snackbar.open(r.title + ">>> 登録しました", "X", { duration: 5000 })
      },
        err => {
          console.error(err)
          this.snackbar.open("登録失敗", "X", { duration: 5000 })
        }))
    })).subscribe()
  }

  onEditTitleOption(titleOption: titleOption, ev: MouseEvent) {
    ev.stopPropagation()
    const dr = this.dialog.open(EditTitleDialogComponent, { data: titleOption })

    dr.afterClosed().pipe(switchMap(to => {
      if (!to) {
        return of()
      }
      return this.titleOptionsService.update(to).pipe(tap(r => {
        this.snackbar.open(to.title + ">>> 更新しました", "X", { duration: 5000 })
      },
        err => {
          console.error(err)
          this.snackbar.open("更新失敗", "X", { duration: 5000 })
        }))
    })).subscribe()
  }

  onDelete(titleOption: titleOption, ev: MouseEvent) {
    ev.stopPropagation()
    this.dialog.open(ConfirmDialogComponent, { data: { title: "タスクタイトルを削除する" } }).afterClosed().pipe(switchMap(r => {
      if (r) {
        return this.titleOptionsService.delete(titleOption).pipe(tap(result => {
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
