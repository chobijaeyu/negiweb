import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { calev } from 'src/app/models/calendar.model';
import { negifield } from 'src/app/models/field.model';
import { seriesTaskOption, seriesTaskSingleTask } from 'src/app/models/task-options.model';
import { CustomSeriesTaskOptionService } from 'src/app/services/custom-task.service';
import { NegifieldService } from 'src/app/services/negifield.service';

@Component({
  selector: 'negi-new-journey-dialog',
  templateUrl: './new-journey-dialog.component.html',
  styleUrls: ['./new-journey-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewJourneyDialogComponent implements OnInit {

  selectedField!: negifield
  selectedSeriesTaskOption!: seriesTaskOption
  nfields$!: Observable<negifield[]>;
  calevs: calev[] = []

  constructor(
    public fs: NegifieldService,
    public seriestaskservice: CustomSeriesTaskOptionService,
    public dialogRef: MatDialogRef<NewJourneyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: negifield
  ) { }

  ngOnInit(): void {
    this.seriestaskservice.getAll()
    this.nfields$ = this.fs.entities$.pipe(map(nfs => nfs.filter(nf => nf.active)))

    if (this.data) {
      this.selectedField = this.data
    }
  }

  genCalEv(seriestasklist: seriesTaskSingleTask[]) {
    seriestasklist.forEach(task => {
      let ev = new calev()
      let startDay = new Date()
      ev.title = task.title
      ev.allDay = true
      ev.NegiFieldID = this.selectedField.ID
      startDay.setDate(startDay.getDate() + task.start)
      ev.start = startDay
      if (task.end) {
        let endDay = new Date()
        endDay.setDate(endDay.getDate() + task.end)
        ev.end = endDay
      }
      this.calevs.push(ev)

    });
  }

  onGoNewJourney(seriestaskopition: seriesTaskOption) {
    this.genCalEv(seriestaskopition.tasklist)
    this.dialogRef.close(this.calevs)
  }

}
