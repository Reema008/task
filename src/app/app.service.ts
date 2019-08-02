import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
data1;
myDate;
years;
days;
uname;
path;
  constructor(public http : HttpClient) { }

  
  update(data,id):Observable<any>{
return this.http.post(`http://192.168.2.204:7000/edit/${id}`,data)
  }
}
