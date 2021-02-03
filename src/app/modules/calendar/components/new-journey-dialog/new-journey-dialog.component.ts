import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { calev } from 'src/app/models/calendar.model';
import { negifield } from 'src/app/models/field.model';
import { NegifieldService } from 'src/app/services/negifield.service';

@Component({
  selector: 'negi-new-journey-dialog',
  templateUrl: './new-journey-dialog.component.html',
  styleUrls: ['./new-journey-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewJourneyDialogComponent implements OnInit {

  selectedField!: negifield
  nfields$!: Observable<negifield[]>;

  calevs: calev[] = []

  constructor(
    public fs: NegifieldService,
    public dialogRef:MatDialogRef<NewJourneyDialogComponent>,
  ) { }

  ngOnInit(): void {
    this.nfields$ = this.fs.entities$
  }

  genCalEv() {
    let ev1 = new calev()
    let ev2 = new calev()
    let ev3 = new calev()
    let ev4 = new calev()
    let ev5 = new calev()
    let today = new Date()
    ev1.title = "[定植] ゴーゴーサン | 目安 10cm"
    ev1.allDay = true
    ev1.NegiFieldID = this.selectedField.ID
    ev1.start = today
    this.calevs.push(ev1)

    ev2.title = "[肥料] スミカエース10号 | 目安 緑色付き"
    ev2.allDay = true
    ev2.NegiFieldID = this.selectedField.ID
    today.setDate(today.getDate() + 14)
    ev2.start = today
    this.calevs.push(ev2)

    ev3.title = "[防除] スミチオン　ダイアジノン　ダコニール　あらびっく　ミックスパワー | 目安 15~20cm"
    ev3.allDay = true
    ev3.NegiFieldID = this.selectedField.ID
    today = new Date()
    today.setDate(today.getDate() + 14)
    ev3.start = today
    today = new Date()
    today.setDate(today.getDate() + 20)
    ev3.end = today
    this.calevs.push(ev3)

    ev4.title = "[除草] ロロックス | 目安 20cm前後"
    ev4.allDay = true
    ev4.NegiFieldID = this.selectedField.ID
    today = new Date()
    today.setDate(today.getDate() + 20)
    ev4.start = today
    today = new Date()
    today.setDate(today.getDate() + 25)
    ev4.end = today
    this.calevs.push(ev4)

    ev5.title = "[散布] ゴーゴーサンorトレファノ | 目安 20cm前後"
    ev5.allDay = true
    ev5.NegiFieldID = this.selectedField.ID
    today = new Date()
    today.setDate(today.getDate() + 25)
    ev5.start = today
    this.calevs.push(ev5)
    
  }

  onGoNewJourney(){
    this.genCalEv()
    this.dialogRef.close(this.calevs)
  }

}
