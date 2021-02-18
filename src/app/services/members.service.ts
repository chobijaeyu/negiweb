import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { member } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  memberUrl = `${environment.baseUrl}/v1/members`
  constructor(
    private H: HttpClient
  ) { }

  fetchMemberList() {
    return this.H.get<member[]>(this.memberUrl)
  }

  updateMember(m: member) {
    return this.H.post(`${this.memberUrl}/${m.uid}`, m)
  }
}
