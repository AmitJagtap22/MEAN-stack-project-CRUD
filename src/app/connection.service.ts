import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private http:HttpClient) { }

  getInfo(){
    return this.http.get("http://localhost:5100/batches")
  }
}
