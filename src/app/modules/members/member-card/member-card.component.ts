import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { member, memberRoles } from 'src/app/models/User.model';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormGroup } from '@angular/forms';
import { MembersService } from 'src/app/services/members.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'negi-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberCardComponent implements OnInit {
  @Input() Member!: member
  roles = memberRoles
  _roles = [
    { value: 1, viewValue: '開発' },
    { value: 2, viewValue: 'オーナー' },
    { value: 3, viewValue: 'マネジャー' },
    { value: 4, viewValue: '正社員' },
    { value: 5, viewValue: 'バイト' },
  ]
  _member!: member
  _memberForm: FormGroup = new FormGroup({})
  constructor(
    private fb: RxFormBuilder,
    private snackbar: MatSnackBar,
    private membersService: MembersService,
    private cdf: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this._member = new member()
    this._memberForm = this.fb.formGroup(this._member)
    this._memberForm.patchValue(this.Member)
  }

  onUpdateMember() {
    this.membersService.updateMember(this._memberForm.value).subscribe(
      () => {
        this.snackbar.open("変更しました。", "🚀", { duration: 2000 })
        this.Member = this._memberForm.value as member
        this.cdf.markForCheck()
      },
      err => {
        this.snackbar.open("失敗しました。", "🛸", { duration: 2000 })
        console.error(err)
      }
    )
  }

}
