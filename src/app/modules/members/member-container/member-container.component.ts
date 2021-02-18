import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MembersService } from 'src/app/services/members.service';
import { Observable } from 'rxjs';
import { member } from 'src/app/models/User.model';

@Component({
  selector: 'negi-member-container',
  templateUrl: './member-container.component.html',
  styleUrls: ['./member-container.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberContainerComponent implements OnInit {

  members$!: Observable<member[]>
  constructor(
    private membersService: MembersService
  ) { }

  ngOnInit(): void {
    this.members$ = this.membersService.fetchMemberList()
  }

}
