import { Component, OnInit,Output,EventEmitter,Input, Directive } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { AppService } from '../app.service';



@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})

export class DateComponent implements OnInit {
 
  
date;
myDate:any;
yr:any=[];
dd:any=[];
i:any;
localUrl: any;
  array:any;

  constructor(private http: HttpClient,private form: FormBuilder,private dates:Router, public service :AppService) {
   
  }

  ngOnInit() {
    // this.yr=this.service.years;
    // this.dd=this.service.days;
    for(this.i=1;this.i<=31;this.i++){
      this.dd.push(this.i)
    }
    for(this.i=1980;this.i<=2019;this.i++){
      this.yr.push(this.i)
    }
//console.log(this.yr)
    this.date = this.form.group({
      day: ['', [Validators.required] ],
      month: ['', [Validators.required] ],
      year: ['', [Validators.required]],
      name:['',[Validators.required]],
      //filer:['', [Validators.required]],
  })
  
   
    
  }

  
  onSelect(sdate){
    console.log((sdate.day)+"."+(sdate.month)+"."+(sdate.year))
    this.myDate=(sdate.year)+"."+(sdate.month)+"."+(sdate.day)
    console.log(this.myDate);
    this.service.myDate=this.myDate;
}
onReg(name){
  this.service.uname=name;
  

  this.dates.navigate(["form"]);
  }



}
