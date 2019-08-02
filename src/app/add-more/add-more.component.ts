import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-more',
  templateUrl: './add-more.component.html',
  styleUrls: ['./add-more.component.css']
})
export class AddMoreComponent implements OnInit {
id: number;
name:string;
email:string;
phnum:number;
public form: {
  items;
};
  constructor() { 

    this.form = {
      items: []
  };
  this.addItem();
  }

  ngOnInit() {
    //console.log(this.items.NgForm)
   
  }
  addItem(){
    this.form.items.push({
      // id: Date.now(),
      name: "",
      email: "",
      phnum: "",
  });
  
  }
  delete(i){
 
      this.form.items.splice( i, 1 );

  }
  onSubmit(data){
    console.log(this.form.items)
  }
  }
 

