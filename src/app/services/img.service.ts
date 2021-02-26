import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgService {
  ImgUrl = `${environment.baseUrl}/v1/`;
  constructor(
    private H: HttpClient
  ) { }

  uploadFile(file: File,filename: string): Observable<any> {
    const form = new FormData();
    form.append('upload', file);
    return this.H.post(`${this.ImgUrl}img/${filename}`, form, { reportProgress: true, observe: 'events' });
  }

  deleteFile(file: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('filename', file);
    return this.H.delete(`${this.ImgUrl}img`, { params });

  }
}
