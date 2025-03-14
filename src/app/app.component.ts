import { Component, OnInit } from '@angular/core';
import { ConnectionService } from './connection.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone:false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Client';

  msg : any;
  constructor(private service : ConnectionService){}

  ngOnInit(): void {
      this.service.getInfo().subscribe(data=>{
        this.msg=data
      })
  }
}
