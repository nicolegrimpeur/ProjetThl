import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpChiffreService {

  //private base = 'https://coronavirusapifr.herokuapp.com/data/live/france';

  constructor(private readonly http: HttpClient) { }
  run(){
    return this.http.get<any>('https://coronavirusapifr.herokuapp.com/data/live/france');
  }
}
