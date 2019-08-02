import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
@Component({
  selector: 'app-employee-department',
  templateUrl: './employee-department.component.html',
  styleUrls: ['./employee-department.component.css']
})
export class EmployeeDepartmentComponent implements OnInit {

  constructor(private http: HttpClient,private form:Router) { }
batch:any=[];
selected:any=[];
  getlist(){
    this.http.get('http://192.168.2.204:7000/departments')
      .subscribe((res: Request) => {
        this.batch=res;
        this.selected=this.batch[0];
        //  console.log(this.tabledata[0])
      }, error => {
        console.log(error);
      });
      
  }

  ngOnInit() {
    this.getlist()

  }
  back() {
    this.form.navigate(["userdetails"]);
  }

}
