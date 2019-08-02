
  import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
  import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
  import { Router } from '@angular/router'

@Component({
  selector: 'app-ng-form',
  templateUrl: './ng-form.component.html',
  styleUrls: ['./ng-form.component.css']
})
export class NgFormComponent implements OnInit {
  private today = new Date();
  public dateOfBirth: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy.mm.dd',
    disableUntil: {year: 1960, month: 1, day: 1},
    disableSince: {year: 2000, month: 1, day: 1}
};
public dateOfJoining: IMyDpOptions = {
  // other options...
  dateFormat: 'yyyy.mm.dd',
 disableUntil: {year: 1980, month: 1, day: 1},
  disableSince: {year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate()+1}
};
  title = 'Registration Form';
  data:any={};
  array:any=[];
  date:any=[];
 
  constructor() {
   
  }
  

  ngOnInit(){
  }
    onSubmit(f) {
      // alert(JSON.stringify(this.data));
      this.array.push((this.data))
      console.log(this.data.dateofjoin.date.year);
      
      if(Number(this.data.dateofjoin.date.year)-Number(this.data.dateofbirth.date.year)<=18){
        alert("Joining Date must be atleast 18 years greater than the Date of Birth")}
        else{
          alert("Registration Successful")
        }
        this.data={}
     f.reset()

    }
  }

