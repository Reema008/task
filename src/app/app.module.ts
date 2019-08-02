import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordComponent } from './password/password.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';
import { SuccessComponent } from './success/success.component';
import { HttpClientModule } from '@angular/common/http';
import { FailComponent } from './fail/fail.component';
import { DataComponent } from './data/data.component';
import { EditformComponent } from './editform/editform.component';
import { MyDatePickerModule } from 'mydatepicker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EmployeeDepartmentComponent } from './employee-department/employee-department.component';
import { SecurityComponent } from './security/security.component';
import { DateComponent } from './date/date.component';
import { DatePickersComponent } from './date-pickers/date-pickers.component'
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { AddComponent } from './add/add.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import {CalendarModule} from 'primeng/calendar';
import { CalendarComponent } from './calendar/calendar.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { AddMoreComponent } from './add-more/add-more.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { NgFormComponent } from './ng-form/ng-form.component';
import { NgSrcModule } from 'ng-src';
import { AddDataComponent } from './add-data/add-data.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SuccessComponent,
    FormComponent,
    PasswordComponent,
    TermsAndConditionsComponent,
    FailComponent,
    DataComponent,
    EditformComponent,
    EmployeeDepartmentComponent,
    SecurityComponent,
    DateComponent,
    DatePickersComponent,
    AddComponent,
    CalendarComponent,
    HomeComponent,
    AddMoreComponent,
    NgFormComponent,
    FileSelectDirective,
    AddDataComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MyDatePickerModule,
    NgMultiSelectDropDownModule.forRoot(),
    MyDateRangePickerModule ,
    FullCalendarModule,
   CalendarModule,
   BsDatepickerModule.forRoot(),
   BrowserAnimationsModule,
   NgSrcModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
