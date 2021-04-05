import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatListOption } from '@angular/material/list';
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

  toConfirmTasks$: Observable<calev[]> = new Observable
  operatingLogs$: Observable<operatingLog[]> = new Observable

  constructor(
    public negiCalendarService: neigiCalendarService,
    public afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.negiCalendarService.getWithQuery({ confirmed: "false" })
    this.toConfirmTasks$ = this.negiCalendarService.entities$.pipe(
      map(entities => entities.filter(v => v.confirmed === false))
    )

    this.operatingLogs$ = this.afs.collection<operatingLog>(environment.operatinglogpath, ref => ref.limit(10).orderBy("when", 'desc')).valueChanges()
  }

  onConfirm(tasks: MatListOption[]) {
    tasks.forEach(t => {
      console.log(t.value);
      const _t = {
        ...t.value as calev
      }
      _t.confirmed = true
      this.negiCalendarService.update(_t)
    })
  }

}
