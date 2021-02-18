import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MemberContainerComponent } from './member-container/member-container.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [MemberContainerComponent, MemberCardComponent],
  imports: [
    CommonModule,
    ShareModule,
    MembersRoutingModule
  ]
})
export class MembersModule { }
