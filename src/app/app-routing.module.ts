import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SuccessComponent } from './success/success.component';
import { FormComponent } from './form/form.component';
import { PasswordComponent } from './password/password.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { FailComponent } from './fail/fail.component';
import { DataComponent } from './data/data.component';
import { EditformComponent } from './editform/editform.component';
import { EmployeeDepartmentComponent } from './employee-department/employee-department.component';
import { SecurityComponent } from './security/security.component';
import { DateComponent } from './date/date.component';
import { DatePickersComponent } from './date-pickers/date-pickers.component';
import { AddComponent } from './add/add.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HomeComponent } from './home/home.component';
import { AddMoreComponent } from './add-more/add-more.component';
import { NgFormComponent } from './ng-form/ng-form.component';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { AddDataComponent } from './add-data/add-data.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent ,
    data: { title: 'Login Form' }
  },
  {
    path: 'success',
    component: SuccessComponent ,
    data: { title: 'Login Successful' }
  },
  {
    path: 'fail',
    component: FailComponent ,
    data: { title: 'Login UnSuccessful' }
  },
  {
    path: 'form',
    component: FormComponent ,
    data: { title: 'Registration Form' }
  },
  {
    path: 'ngform',
    component: NgFormComponent ,
    data: { title: 'Registration Form' }
  },
  {
    path: 'setpassword',
    component: PasswordComponent ,
    data: { title: 'Password Validations' }
  },

  {
    path: 'termsandconditions',
    component: TermsAndConditionsComponent,
    data: { title: 'Terms and Conditions' }
  },
  {
    path: 'date',
    component: DateComponent,
    data: { title: 'Date' }
  },
  {
    path: 'employee_departments',
    component: EmployeeDepartmentComponent,
    data: { title: 'Departments List' }
  },
  {
    path: 'userdetails',
    component: DataComponent,
    data: { title: 'User Details' }
  },
  {
    path: 'editform',
    component: EditformComponent ,
    data: { title: 'Registration Form' }
  },
  {
    path: 'security',
    component: SecurityComponent ,
    data: { title: 'Encrypt/Decrypt' }
  },
  {
    path: 'datePicker',
    component: DatePickersComponent ,
    data: { title: 'Date_Range Pickers' }
  },
  {
    path: 'add',
    component: AddComponent ,
    data: { title: 'Add More' }
  },
  {
    path: 'addData',
    component: AddDataComponent ,
    data: { title: 'Add More Data' }
  },
  {
    path: 'calendar',
    component: CalendarComponent ,
    data: { title: 'Full Calendar' }
  },
  {
    path: 'fullCalendar',
    component:FullCalendarComponent ,
    data: { title: 'Full Calendar' }
  },
  {
    path: 'home',
    component: HomeComponent ,
    data: { title: 'Home' }
  },
  {
    path: 'addmore',
    component: AddMoreComponent ,
    data: { title: 'Add More' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
