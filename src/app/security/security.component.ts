import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
encrypt_decrypt;
  constructor(private http: HttpClient,private form: FormBuilder,private failpg:Router,private back:Router)
   { }
  ngOnInit(){
  this.encrypt_decrypt = this.form.group({
    text: ['', [Validators.required] ]
 });
  }
  title = 'Encrypt/Decrypt';
  array:any="";
  array1:any="";
  encryptedData:any=[];

enSubmit(details){
  if (details.length!=0){
  this.http.post('http://192.168.2.204:7000/encrypt',details,{
    responseType: 'text',
  })
  .subscribe((res)=>{
    this.array=res;
    console.log(this.array)
  //if(this.array!="Invalid Credentials"){
  this.encryptedData=prompt("Encrypted Data:",this.array)
 console.log(this.encryptedData)
 
// }
// else
//   this.failpg.navigate(["fail"]);  
  }, error => {
    console.log(error);
  });
}else{
  alert("Enter a text")
}
  
}
deSubmit(endata){
  if (endata.length!=0){
this.http.post('http://192.168.2.204:7000/decrypt',endata,{
  responseType: 'text',
})
 .subscribe((res)=>{
  this.array1=res;
  console.log(this.array1)
prompt("Decrypted Data:",this.array1) 
}, error => {
  console.log(error);
});
  }else{
    alert("Encrypt the data")
  }
}
}
