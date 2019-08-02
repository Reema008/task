import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { AppService } from '../app.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {
  tabledata:any;
  selected:any;
  imgsrc:any;
  img;
  imgurl:string="http://192.168.2.204:7000/"
  constructor(private http: HttpClient,private regform:Router, public service :AppService) { }

  getlist(){
    this.http.get('http://192.168.2.204:7000/getlist')
      .subscribe((res: Request) => {
        this.tabledata=res;
        console.log(this.tabledata)
        this.selected=this.tabledata[0];
        console.log(this.selected)
         for(var i=0;i<this.selected.length;i++){
           console.log(this.selected[i].profilePic)
           if(this.selected[i].docs.length!=0){
          this.http.get(`http://192.168.2.204:7000/${this.selected[i].docs}`)
          .subscribe((res: Request) => {
            this.img=res;
            console.log(this.img,"hhhh")
          }, error => {
            console.log(error);
          });
        }
        else{
          this.selected[i].docs="dp.png";
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

}
