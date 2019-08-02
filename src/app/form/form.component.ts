import { Component, OnInit,Output,EventEmitter,Input, Directive } from '@angular/core';
import {Validators, FormControl,FormBuilder, FormGroup, FormArray  } from '@angular/forms';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import * as moment from 'moment';
import * as _ from 'underscore';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { AppService } from '../app.service';
const URL = 'http://192.168.2.204:7000/addfile';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url:URL});

  myDate=moment().format('YYYY-MM-DD')
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
  data:any={}
  array:any=[];
  disabled=false;
  ShowFilter=false;
  limitSelection=false;
  states:any=[];
  selectedItems:any=[];
  dropdownSettings:any={};
  dropdownSetting:any={};
  selectedState:any=[];
  b:number;
  j:number;
  birth:any;
  join:any;
angForm:FormGroup;
yr:any=[];
n:any=0;
dd:any=[];
  selectedShift: any=[];
  shifts: any=[];
  selectedShifts: any=[];
  constructor(private http: HttpClient,private form: FormBuilder,private logform:Router,private dates:Router, public service :AppService) {
   
  }
  

  ngOnInit(){
    
    this.angForm = this.form.group({
       name: [{ value: this.service.uname , disabled: true}, [Validators.required,Validators.minLength(4)] ],
       dob: ['', [Validators.required] ],
       email: ['', [Validators.required,Validators.email]],
       num: ['',[Validators.required,Validators.pattern("[6-9][0-9]{9}")]],
       password: ['',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
       abtu: ['',[Validators.required]],
       states: [this.selectedState],
       //states:['', [Validators.required]],
       gender: ['', [Validators.required]],
       dpmid: ['',[Validators.required,Validators.pattern("[0-8]{1}")]],
       doj: [{ value: this.service.myDate , disabled: true}],
       accept: ['', [Validators.requiredTrue]],
       file:[''],
       shifts:[this.selectedShift],
       sduration:['',[Validators.required,Validators.pattern("[1-9]{1}")]],
       //items: this.form.array([ this.createItem() ])
    });
//console.log(this.service.myDate)
   


    this.states=[{item_id:1,item_text:'Kerala'},
    {item_id:2,item_text:'Andhra Pradesh'},
    {item_id:3,item_text:'Telangana'},
    {item_id:4,item_text:'Tamil Nadu'},
    {item_id:5,item_text:'Karnataka'},
    {item_id:6,item_text:'Goa'},
    {item_id:7,item_text:'Jammu and Kashmir'},
    {item_id:8,item_text:'Orissa'}];

    //console.log(this.selectedItems);
    this.dropdownSettings={
      singleSelection:false,
      idField:'item_id',
      textField:'item_text',
      selectAllText:'SelectAll',
      unSelectAllText:'UnSelectAll',
      itemsShowLimit:2,
      allowSearchFiter:this.ShowFilter
    };


console.log(this.service.uname )
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false;};
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded:', item,status,response);
         this.service.path=response;
         console.log(this.service.path);
         
         alert('Profile Photo uploaded successfully');
     };
     let optns = this.uploader.options;
  optns = {
    ...optns,
    additionalParameter: { userName: this.service.uname }
  };
  this.uploader.setOptions(optns);


  this.shifts=[{item_id:1,item_text:'A'},
  {item_id:2,item_text:'B'},
  {item_id:3,item_text:'C'},
  {item_id:4,item_text:'Off'}]

this.dropdownSetting={
  singleSelection:false,
  idField:'item_id',
  textField:'item_text',
  selectAllText:'SelectAll',
  unSelectAllText:'UnSelectAll',
  itemsShowLimit:4,
  allowSearchFiter:this.ShowFilter
};


  }
  


  onItemSelect(item:any){
    console.log('onItemSelect',item)
    this.selectedItems.push(item.item_id);
      console.log(this.selectedItems.toString());
      //  // this.selectedItems= _.pluck(item,'item_text');
  //     console.log(this.selectedItems)
  }
  onSelectAll(items:any){
    this.n=1;
    console.log('onSelectAll',items)
    for(var i=0;i<items.length;i++){
    this.selectedState.push(items[i].item_id);
    }
      console.log(this.selectedState.toString());
  }

 
  onShiftSelect(item:any){
    console.log('onShiftSelect',item)
    this.selectedShifts.push(item.item_text);
      console.log(this.selectedShifts.toString());
      //  // this.selectedItems= _.pluck(item,'item_text');
  //     console.log(this.selectedItems)
  }
  onShiftSelectAll(items:any){
    this.n=1;
    console.log('onShiftSelectAll',items)
    for(var i=0;i<items.length;i++){
    this.selectedShift.push(items[i].item_text);
    }
      console.log(this.selectedShift.toString());
  }






    onSubmit(data) {
      console.log(this.angForm.value)
      // this.array.push((this.angForm.value))
      // this.array=this.angForm.value;
      data.file=this.service.path;
      data.name=this.service.uname;
      data['dob']=moment(data.dob.formatted).format('YYYY-MM-DD');
      data.doj=this.service.myDate;
      if(this.n==0)
      data['states']=this.selectedItems.toString();
      else if(this.n==1)
      data['states']=this.selectedState.toString()
      //console.log(data['dob'],data['doj'])
      if(this.n==0)
      data['shifts']=this.selectedShifts.toString();
      else if(this.n==1)
      data['shifts']=this.selectedShift.toString()
      console.log(data['dob'],data.doj)
        this.birth=data['dob'][0]+data['dob'][1]+data['dob'][2]+data['dob'][3]
        this.join=data.doj[0]+data.doj[1]+data.doj[2]+data.doj[3]
        console.log(Number(this.birth),Number(this.join))
        this.b=Number(this.birth)
        this.j=Number(this.join)
        console.log(this.b,this.j)
        console.log(this.j+20)
        if(this.j-this.b>=18){
        this.logform.navigate(["success"]);
      this.http.post('http://192.168.2.204:7000/add',data)
      .subscribe((res: Request) => {
        this.array=res;
      }, error => {
        console.log(error);
      });
      }else
        alert("Joining Date must be atleast 18 years greater than the Date of Birth")
     
      console.log(data)

      // this.selectedItems= _.pluck(this.states,'item_id');
      // console.log(this.selectedItems);
     this.angForm.reset()
    }
 
    }
