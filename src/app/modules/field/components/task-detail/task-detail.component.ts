import { Component, OnInit, ChangeDetectionStrategy, Inject, ChangeDetectorRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { calev } from 'src/app/models/calendar.model';
import { negifield, priorities } from 'src/app/models/field.model';
import { ImgService } from 'src/app/services/img.service';
import { NegifieldService } from 'src/app/services/negifield.service';

@Component({
  selector: 'negi-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailComponent implements OnInit {

  scannerEnabled: boolean = false

  isMatchFieldId: boolean = false
  imagePreview!: string;
  selecetdFile!: File;
  priorities = priorities

  constructor(
    private afa: AngularFireAuth,
    private CDR: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private imgService: ImgService,
    private imageCompress: NgxImageCompressService,
    public negifieldservice: NegifieldService,
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
    this.snackbar.open("以下のカメラを見つかりました。\n" + onCamerasFoundMsg, "X", { duration: 1000 })
    console.debug(e)
  }

  camerasNotFoundHandler(e: any) {
    this.snackbar.open("カメラが見つかりません。\n" + "お使いの環境（ご使用端末、ブラウザにより）カメラ利用できない場合がございます。", "X", { duration: 3000 })
    console.error(e)
  }

  onFinished() {
    this.data.completed = !this.data.completed
    this.afa.currentUser.then(u => {
      this.data.operator = u?.displayName as string
      this.dialogRef.close(this.data)
    })

  }

  // onFile(event: any) {
  //   this.selecetdFile = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(this.selecetdFile);
  //   reader.onload = () => {
  //     this.imagePreview = reader.result;
  //     this.CDR.markForCheck();
  //   };
  // }

  onCompress() {
    this.imageCompress.uploadFile().then(({ image, orientation }) => {
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
      this.imageCompress.compressFile(image, orientation, 50, 30).then(
        result => {
          this.imagePreview = result;
          this.CDR.markForCheck();
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
        }
      );

    });
  }

  onUploadImg() {
    this.urltoFile(this.imagePreview, this.data.NegiFieldID, 'text/plain').then((imgfile) => {
      console.log(imgfile)
      this.imgService.uploadFile(imgfile, this.data.NegiFieldID).subscribe(r => {
        this.snackbar.open("アップロード完了しました。", "X", { duration: 3000 })
      },
        err => {
          console.error(err)
          this.snackbar.open("アップロード失敗しました。", "X", { duration: 3000 })
        })
    })
  }

  urltoFile(url: string, filename: string, mimeType: string) {
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  }

  selectEntityById(fieldid: number): Observable<negifield | undefined> {
    return this.negifieldservice.entityMap$.pipe(
      map(entities => entities[fieldid]),
      first());
  }
  
}
