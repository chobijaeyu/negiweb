import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { calev } from 'src/app/models/calendar.model';
import { negifield, priorities } from 'src/app/models/field.model';

@Component({
  selector: 'negi-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailComponent implements OnInit {

  scannerEnabled: boolean = false

  isMatchFieldId: boolean = false
  priorities = priorities

  constructor(
    public dialogRef: MatDialogRef<TaskDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: calev
  ) { }

  ngOnInit(): void {
  }

  scanSuccessHandler(e: string) {
    let nf: negifield = JSON.parse(e)
    this.isMatchFieldId = nf.ID === this.data.NegiFieldID
    this.scannerEnabled = !this.scannerEnabled
  }

  scanErrorHandler(e: Error) {
    console.error(e)
  }

  scanFailureHandler(e: any) {
    console.error(e)
  }

  camerasFoundHandler(e: any) {
    let onCamerasFoundMsg: string = ''
    e.forEach((i: any) => {
      onCamerasFoundMsg = onCamerasFoundMsg + i.label + "\n"
    })
    alert("以下のカメラを見つかりました。\n" + onCamerasFoundMsg)
    console.debug(e)
  }

  camerasNotFoundHandler(e: any) {
    alert("カメラが見つかりません。\n" + "お使いの環境（ご使用端末、ブラウザにより）カメラ利用できない場合がございます。")
    // console.log(e)
  }

  onFinished() {
    this.data.completed = !this.data.completed
    this.dialogRef.close(this.data)
  }
}
