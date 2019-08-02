import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { AppService } from '../app.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {
  tabledata: any;
  selected: any;
  imgsrc: any;
  imgurl: string = "http://192.168.2.204:7000/"
  img;
  c:number;
  constructor(private http: HttpClient, private regform: Router, public service: AppService) { }

  getlist() {
    this.http.get('http://192.168.2.204:7000/list')
      .subscribe((res: Request) => {
        this.tabledata = res;
        this.selected = this.tabledata[0];
        //console.log(this.selected)
        for (var i = 0; i < this.selected.length; i++) {
          this.selected[i].shift_order = this.selected[i].shift_order.split(',')
          console.log(this.selected[i].shift_order);
          var rep=this.selected[i].shift_duration;
          var arr=[];
          this.selected[i].shift_order.forEach(function(words){
            console.log(words)
            if(words=="Off"){
            arr.push(words)
            }
            else{
              arr.push(words.repeat(rep))
            }
          });
          console.log(arr)
          this.selected[i].shift_order = arr.toString()
          //console.log(this.selected[i].profilePic)
          if (this.selected[i].profilePic.length != 0) {
            this.http.get(`http://192.168.2.204:7000/${this.selected[i].profilePic}`)
              .subscribe((res: Request) => {
                this.img = res;
                console.log(this.img,"hhhh")
              }, error => {
                console.log(error);
              });
          }
          else {
            this.selected[i].profilePic = "dp.png";
          }
        }
      }, error => {
        console.log(error);
      });

  }

  ngOnInit() {
    this.getlist()
    // this.imgsrc=this.service.path;
    // console.log(this.imgsrc);

  }
  add() {
    this.regform.navigate(["date"]);
  }
  batch() {
    this.regform.navigate(["employee_departments"]);
  }


  edit(data) {
    console.log(data);
    this.service.data1 = data;
    this.regform.navigate(["editform"]);

  }
  delete(id) {
    console.log(id);
    this.http.post('http://192.168.2.204:7000/delete', id).subscribe(data => {
      this.getlist();
    })

  }
}
