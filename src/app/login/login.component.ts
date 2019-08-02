
import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import * as moment from 'moment';
import * as _ from 'underscore';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm;
  regForm;
  dd:any=[]
  yr:any=[]
  constructor(private http: HttpClient,private form: FormBuilder,private successpg:Router,private failpg:Router,private dates:Router, public service :AppService)
   { }
  ngOnInit(){
  this.loginForm = this.form.group({
    name: ['',[Validators.required] ],
    password: ['',[Validators.required]],
 });
 
  }
  title = 'Login Form';
  nam:any={};
  pwd:any={};
  detail:any=[];
  name="";
  c:number;
  i:number;
  array:any="";
  password:any;



onSubmit(details){
  this.http.post('http://192.168.2.204:7000/login',details,{
    responseType: 'text',
  })
  .subscribe((res)=>{
    this.array=res;
    console.log(this.array)
  if(this.array!="Invalid Credentials")
  this.successpg.navigate(["userdetails"]);
else
  this.failpg.navigate(["fail"]);  
  }, error => {
    console.log(error);
  });
  
}
}
//   onSubmit(details) {
//     console.log(details)
//     this.http.get('http://localhost:7000/list')
//     .subscribe((res) => {
//       this.detail= res;
     
   
//       this.c=0;
//     for(this. i=0;this.i<this.detail[0].length;this.i++){
//       for(this. i=0;this.i<this.detail.length;this.i++){
//      if((details.name==this.detail[0][this.i].Name)&&(details.password==this.detail[0][this.i].Password))
//     if((details.name==this.detail[this.i].Name)&&(details.password==this.detail[this.i].Password))
//     {
//       this.c=1;
//       break;
//     }}
 
//   console.log(this.c)
//     if(this.c==1){
//       this.successpg.navigate(["userdetails"]);
//     }
//     else{
//       this.failpg.navigate(["fail"]);
//     }
//   }, error => {
//     console.log(error);
//    });
//   }

// }
// details = [
  //   {
  //     id:1,
  //     name:"Alice",
  //     password:"Alice"
  //   },
  //   {
  //     id:2,
  //     name:"Bob",
  //     password:"Bob"
  //   },
  //   {
  //     id:3,
  //     name:"Been",
  //     password:"Been"
  //   },
  //   {
  //     id:4,
  //     name:"Jack",
  //     password:"Jack"
  //   },
  //   {
  //     id:5,
  //     name:"Jill",
  //     password:"Jill"
  //   }
  // ];
  // getList(){
 
  //   this.http.get('http://localhost:7000')
  //   .subscribe((res) => {
  //     this.details = res;
  //   }, error => {
  //     console.log(error);
  //   });
  // }



