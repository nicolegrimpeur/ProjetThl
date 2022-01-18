import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // private base = 'https://nicob.ovh/';
  private base = 'http://localhost:5000/';

  private baseUrl = this.base + 'api';

  constructor(private readonly http: HttpClient) {
  }

  // getUserQr() {
  //   const url = this.baseUrl
  // }


}
