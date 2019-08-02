import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent{
  // @Input() public edata:[];
  constructor(private form:Router) { }

  back() {
    this.form.navigate(["form"]);
  }

}
