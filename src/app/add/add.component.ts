import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { AppService } from '../app.service';
import * as _ from 'underscore';

const URL = 'http://192.168.2.204:7000/addfiles';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({url:URL});
addForm;
array:any=[];
n:number=1;
Arr:any=[];
items: FormArray;
localImageUrl: any;

  constructor(private form: FormBuilder,private success:Router,private backto:Router,public service :AppService,private http: HttpClient) { }

  ngOnInit() {
    this.addForm = this.form.group({
      items: this.form.array([ this.add() ])
   });
   this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false;};
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('FileUpload:uploaded:', item,status,response);
         //alert('Profile Photo uploaded successfully');
     };
  }

add(): FormGroup {
  return this.form.group({
    name: ['',[Validators.required] ],
    mail: ['',[Validators.required,Validators.email]],
    contact: ['',[Validators.required,Validators.pattern("[6-9][0-9]{9}")]],
    file:[''],
  });
}

addItem(): any {
  this.items = this.addForm.get('items') as FormArray;
  this.items.push(this.add());
  //console.log(this.addForm.controls.items.controls.value.name);
}

delete(n){
  this.items = this.addForm.get('items') as FormArray;
  this.items.removeAt(n);
}

onSubmit(data) {
  
  for(var i=0;i<data.items.length;i++){
 
  data.items[i].file=data.items[i].file.substring(data.items[i].file.indexOf("fakepath") + 9, data.items[i].file.length)
  console.log(data.items[i])
  this.http.post('http://192.168.2.204:7000/addmore',data.items[i])
  .subscribe((res: Request) => {
    this.array=res;
    this.success.navigate(["addData"]);
  }, error => {
    console.log(error);
  });
}
}
}