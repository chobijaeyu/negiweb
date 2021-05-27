import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { calev } from 'src/app/models/calendar.model';
import { operatingLog } from 'src/app/models/log.model';
import { neigiCalendarService } from 'src/app/services/calendar.service';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent } from '../../share/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'negi-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.sass']
})
export class TaskContainerComponent implements OnInit {

  operatingLogs$: Observable<operatingLog[]> = new Observable
  dataSource = new MatTableDataSource<calev>();
  selection = new SelectionModel<calev>(true, []);

  logdataSource = new MatTableDataSource<operatingLog>();

  displayedColumns: string[] = ['select', 'title', 'operator', 'CreatedAt', 'action'];
  logdisplayedColumns: string[] = ['log', 'time']

  constructor(
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public negiCalendarService: neigiCalendarService,
    public afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.negiCalendarService.getWithQuery({ confirmed: "false" })
    this.negiCalendarService.entities$.pipe(
      map(entities => new MatTableDataSource(entities.filter(v => v.confirmed === false)))
    ).subscribe(r => {
      this.dataSource = r
    })

    this.afs.collection<operatingLog>(environment.operatinglogpath, ref => ref.limit(10).orderBy("when", 'desc')).valueChanges().subscribe(
      r => {
        this.logdataSource = new MatTableDataSource<operatingLog>(r)
      }
    )
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: calev): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  onConfirm(tasks: calev[]) {
    tasks.forEach(t => {
      let _t: calev = new calev()
      Object.assign(_t, t)
      _t.confirmed = true
      this.negiCalendarService.update(t).pipe(tap(result => {
        this.snackbar.open(`${result}確認しました`, "X", { duration: 5000 })
      },
        err => {
          console.error(err)
          this.snackbar.open("失敗", "X", { duration: 5000 })
        }))
    })
  }

  onDelete(el: any) {
    this.dialog.open(ConfirmDialogComponent, { data: { title: "確認待ち新規タスクを削除する" } }).afterClosed().pipe(switchMap(r => {
      if (r) {
        return this.negiCalendarService.delete(el).pipe(tap(result => {
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
}
