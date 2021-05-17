import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatListOption } from '@angular/material/list';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { calev } from 'src/app/models/calendar.model';
import { operatingLog } from 'src/app/models/log.model';
import { neigiCalendarService } from 'src/app/services/calendar.service';
import { environment } from 'src/environments/environment';

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

  displayedColumns: string[] = ['select', 'title', 'operator', 'CreatedAt'];
  logdisplayedColumns: string[]= ['log','time']

  constructor(
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
      t.confirmed = true
      this.negiCalendarService.update(t)
    })
  }

}
