import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { AppService } from '../app.service';
import * as moment from 'moment';
@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.css']
})
export class EditformComponent implements OnInit {
  myDate1=moment().format('YYYY-MM-DD')
arr:any=[]
  title = 'Make Changes...';
  array:any=[];
  b:number;
  j:number;
  birth:any;
  join:any;
  n:number=0;
  n1:number=0;
narray:[];
  // c:number=-1;
  private today = new Date();
  public dateOfBirth: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy.mm.dd',
    // dateFormat: 'dd.mm.yyyy',
    disableUntil: {year: 1960, month: 1, day: 1},
    disableSince: {year: 2000, month: 1, day: 1}
};
public dateOfJoining: IMyDpOptions = {
  // other options...
  dateFormat: 'yyyy.mm.dd',
  // dateFormat: 'dd.mm.yyyy',
  disableUntil: {year: 1980, month: 1, day: 1},
  disableSince: {year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate()+1}
};



  disabled=false;
  ShowFilter=false;
  limitSelection=false;
  states:any=[];
  selectedItems:any=[];
  selectedItem:any=[];
  selectedState:any=[];
  dropdownSettings:any={};


angForm;
  selectedShift: any=[];
  ar: any=[];
  shifts: any=[];
  dropdownSetting: any={}
  selectedShifts: any=[];
  selectedShiftAll: any=[];
  
  constructor(private http: HttpClient,private form: FormBuilder,private logform:Router, public service : AppService) {
   
  }

  ngOnInit(){
      
    this.angForm = this.form.group({
       name: ['', [Validators.required,Validators.minLength(4)] ],
       dob: ['',[Validators.required]],
       email: ['', [Validators.required,Validators.email]],
       num: ['',[Validators.required,Validators.pattern("[6-9][0-9]{9}")]],
       password: [{ value: this.service.data1.Password , disabled: true}],
       abtu: ['',[Validators.required]],
       states: [{value:[],disabled: false},[Validators.required]],
       gender: ['', [Validators.required]],
       dpmid: ['',[Validators.required]],
       doj: [{ value: this.service.data1.Date_of_Joining , disabled: true}, [Validators.required] ],
       accept: ['', [Validators.requiredTrue]],
       shifts:[{value:[],disabled: false},[Validators.required]],
       sduration:['',[Validators.required,Validators.pattern("[1-9]{1}")]]
    });

    console.log(this.service.data1.State)
    this.angForm.patchValue(
      {name:this.service.data1.Name,
        //dob: this.service.data1.Date_of_Birth,
        email:this.service.data1.eMail,
        num:this.service.data1.Contact,
        password:this.service.data1.Password,
        abtu:this.service.data1.About_You,
        // states:this.service.data1.State,
        gender:this.service.data1.Gender,
        dpmid:this.service.data1.DepartmentsId,
        sduration:this.service.data1.shift_duration,
       // doj:this.service.data1.Date_of_Joining,
    }); 
     
    this.angForm.patchValue({dob: {
      jsdate: new Date(this.service.data1.Date_of_Birth),
  }});
  

    console.log(this.angForm.value)
    this.states=[{item_id:1,item_text:'Kerala'},
    {item_id:2,item_text:'Andhra Pradesh'},
    {item_id:3,item_text:'Telangana'},
    {item_id:4,item_text:'Tamil Nadu'},
    {item_id:5,item_text:'Karnataka'},
    {item_id:6,item_text:'Goa'},
    {item_id:7,item_text:'Jammu and Kashmir'},
    {item_id:8,item_text:'Orissa'}];

    console.log(this.selectedItems);
    this.dropdownSettings={
      singleSelection:false,
      idField:'item_id',
      textField:'item_text',
      selectAllText:'SelectAll',
      unSelectAllText:'UnSelectAll',
      itemsShowLimit:2,
      allowSearchFiter:this.ShowFilter
    };
    
    this.arr=this.service.data1.State.split(',').map(function(val) {
      return parseInt(val, 10);
    });
    console.log(this.arr)
for(var j=0;j<this.arr.length;j++)
{

  for(var k=0;k<this.states.length;k++){
  if(this.arr[j]==this.states[k].item_id){
    this.selectedItems.push(this.states[k].item_text)
  }
}}

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
console.log(this.service.data1.shift_order)
this.ar=this.service.data1.shift_order.split(',').map(function(val) {
  return val.toString();
});
console.log(this.ar)
for(var j=0;j<this.ar.length;j++)
{

for(var k=0;k<this.shifts.length;k++){
if(this.ar[j]===this.shifts[k].item_text){
this.selectedShifts.push(this.shifts[k].item_text)
}
}}

  }

  onItemSelect(item:any){
    this.n=-1;
    console.log('onItemSelect',item)
    this.selectedItem.push(item.item_id);
      console.log(this.selectedItem,this.selectedItems);
      
  }
  onSelectAll(items:any){
    this.n=1;
    console.log('onSelectAll',items)
    for(var i=0;i<items.length;i++){
    this.selectedState.push(items[i].item_id);
    }
      console.log(this.selectedState);
  }

  onShiftSelect(item:any){
    this.n1=-1;
    console.log('onShiftSelect',item)
    this.selectedShift.push(item.item_text);
      console.log(this.selectedShift.toString());
      //  // this.selectedItems= _.pluck(item,'item_text');
  //     console.log(this.selectedItems)
  }
  onShiftSelectAll(items:any){
    this.n1=1;
    console.log('onShiftSelectAll',items)
    for(var i=0;i<items.length;i++){
    this.selectedShiftAll.push(items[i].item_text);
    }
      console.log(this.selectedShiftAll.toString());
  }

    onSubmit(data) {
      console.log(this.angForm.value)
      if(this.n1==-1)
      data['shifts']=this.selectedShift.toString();
      else if(this.n1==0)
      data['shifts']=this.selectedShifts.toString();
      else if(this.n1==1)
      data['shifts']=this.selectedShiftAll.toString()
      else
      data['shifts']=this.service.data1.shift_order;
      if(this.n==-1)
      data['states']=this.selectedItem.toString();
      else if(this.n==1)
      data['states']=this.selectedState.toString();
      else
      data['states']=this.service.data1.State;
      console.log(data['states']);
      data['dob']=moment(data.dob.jsdate).format('YYYY-MM-DD');
      data.doj=this.service.data1.Date_of_Joining;
      console.log(data['dob'],data['doj'])
      this.birth=data['dob'][0]+data['dob'][1]+data['dob'][2]+data['dob'][3]
      this.join=data.doj[0]+data.doj[1]+data.doj[2]+data.doj[3]
      console.log(Number(this.birth),Number(this.join))
      this.b=Number(this.birth)
      this.j=Number(this.join)
      console.log(this.b,this.j)
      console.log(this.j+20)
      if(this.j-this.b>=18){
      this.service.update(data,this.service.data1.Id) .subscribe((res: Request) => {
        this.array=res;
          this.logform.navigate(["userdetails"]);
      }, error => {
        console.log(error);
      });
      }else
        alert("Joining Date must be atleast 18 years greater than the Date of Birth")
      
      console.log(data)
      
      // this.endata.navigate(["data"]);
      // this.edata.emit(this.angForm.value.name);
     //this.angForm.reset()
    }
   
    

}


