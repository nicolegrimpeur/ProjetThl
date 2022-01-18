import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // private base = 'https://nicob.ovh/';
  private base = 'http://localhost:5000/';

  constructor(private readonly http: HttpClient) {
  }
}
