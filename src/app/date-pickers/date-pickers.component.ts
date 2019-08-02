import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import * as moment from 'moment';


@Component({
  selector: 'app-date-pickers',
  templateUrl: './date-pickers.component.html',
  styleUrls: ['./date-pickers.component.css']
})
export class DatePickersComponent implements OnInit {

  //myDate = moment().format('YYYY-MM-DD')
  start;
  started: any;
  ended: Date;

  startdate: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    inline: false,
    disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth()+1, day: new Date().getDate()}
  };




  enddate: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    inline: false,
    disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth()+1, day: new Date().getDate() }
  };

  rangePicker: IMyDrpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    height: '34px',
    width: '260px',
    inline: false,
    alignSelectorRight: false,
    indicateInvalidDateRange: true,
    }
  

  date = new FormGroup({
    stdate: new FormControl(''),
    endate: new FormControl(''),
    range: new FormControl(''),
    revRange: new FormControl('')
  })
 

  constructor(public form: FormBuilder, private http: HttpClient, public router: Router) { }

  onDateChanged(event: IMyDateModel) {
    console.log(event);
    this.enddate = {
      disableUntil: {
        year: new Date(event.jsdate).getFullYear(), month: new Date(event.jsdate).getMonth() + 1, day: new Date(event.jsdate).getDate()
      }
    }
  //   this.date.patchValue({range: {
  //     beginDate: {
  //         year: new Date(event.jsdate).getFullYear(),
  //         month:new Date(event.jsdate).getMonth()+1,
  //         day: new Date(event.jsdate).getDate()
  //     },
  //     endDate: {
  //         year: new Date().getFullYear(),
  //         month:new Date().getMonth() + 1,
  //         day: new Date().getDate()
  //     }
  // }});
    this.start=event.formatted;
    this.rangePicker = {
      disableUntil: {
        year: new Date(event.jsdate).getFullYear(), month: new Date(event.jsdate).getMonth() + 1, day: new Date(event.jsdate).getDate()
      }
    }
  }
  onDateChangedRange(event: IMyDateModel) {
    console.log(event.formatted,this.start);
    this.date.patchValue({range: {
      beginDate: {
          year: new Date(this.start).getFullYear(),
          month:new Date(this.start).getMonth()+1,
          day: new Date(this.start).getDate()
      },
      endDate: {
          year: new Date(event.formatted).getFullYear(),
          month:new Date(event.formatted).getMonth() + 1,
          day: new Date(event.formatted).getDate()
      }
  }});

  this.rangePicker = {
    disableSince: {
      year: new Date(event.jsdate).getFullYear(), month: new Date(event.jsdate).getMonth() + 1, day: new Date(event.jsdate).getDate()
    }
  }
  }
  onDateRangeChanged(event: IMyDateRangeModel) {
    console.log(event);
    this.date.patchValue({revRange: {
      idate:new Date(event.formatted)
  }});
  this.date.patchValue({
    stdate:{
    jsdate: new Date(event.beginJsDate),
    },
    endate:{
      jsdate: new Date(event.endJsDate),
      },
    })
  }

    ngOnInit() {
   
      this.date = this.form.group({
        stdate: ['', [Validators.required] ],
        endate: ['', [Validators.required] ],
        range: ['', Validators.required],
        revRange: ['', Validators.required]
      });
    }

}