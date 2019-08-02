import { Component, Directive, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGrigPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'; // for dateClick

//import { calendar } from 'ngx-bootstrap/chronos/moment/calendar';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  options: any;
  event:any;
  eventsModel: any;
  n:number;
date: number;
  @ViewChild('calendar', {static: false})calendar: FullCalendarComponent; // the #calendar in the template

  calendarVisible = true;
  // calendarPlugins = [dayGridPlugin, timeGrigPlugin, interactionPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[] = [
    { title: 'Event Now', start: new Date() }
  ];


  ngOnInit() {
    
    this.options = {
      editable: true,
     customButtons: {
       
        prev:{
          click: function () {
            const dateObj = new Date();
            this.date=dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth());
            console.log(  this.date)
          }
        },
        next:{
          click: function () {
            const dateObj = new Date();
            this.date=dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth()+2);
            console.log(  this.date)
          }
        },
      },
      header: {
        left: 'prev,next today ',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
        
      },
      plugins: [dayGridPlugin, interactionPlugin, timeGrigPlugin]
      
    }
    console.log(this.options);
    
  }

  toggleVisible() {
    this.calendarVisible = !this.calendarVisible;
  }

  toggleWeekends() {
    this.calendarWeekends = !this.calendarWeekends;
  }

  handleDateClick(arg) {
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      this.event=prompt("Enter Event","")
      console.log(this.event)
      this.calendarEvents = this.calendarEvents.concat({ 
        title:this.event,
        start: arg.date,
        allDay: arg.allDay
      })
    }
  }
  
  eventClick(model) {
    console.log(model);
  }
 
  // get yearMonth(): number {
  //   const dateObj = new Date();
  //   console.log(dateObj.getUTCMonth() + 1);
  //   this.date=dateObj.getUTCMonth() + 1;
  //   return (dateObj.getUTCMonth() + 1);
  //   //return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
    
  // }

  dayRender(ev){
    ev.el.addEventListener('dblclick', () => {
       alert('double click!');
    });
  }
}
 // customButtons: {
      //   prev:{
      //     click: function () {
      //       const dateObj = new Date();
      //       //console.log(dateObj.getUTCMonth() + 1);
      //       this.date=dateObj.getUTCMonth() + 1;
      //       //this.n++;
      //       //return (dateObj.getUTCMonth() + 1);
      //       console.log(  this.date-1)
      //     }
      //   },
      //   next:{
      //     click: function () {
      //       const dateObj = new Date();
      //       //console.log(dateObj.getUTCMonth() + 1);
      //       this.date=dateObj.getUTCMonth() + 1;
      //       //this.n++;
      //       //return (dateObj.getUTCMonth() + 1);
      //       console.log(  this.date+1)
      //     }
      //   },
      // },

       // updateHeader() {
  //   this.options.header = {
  //     left: 'prev,next',
  //     center: 'title',
  //     right: ''
  //   };
  // }
  // updateEvents() {
  //   this.eventsModel = [{
  //     title: 'Updaten Event',
  //     start: this.yearMonth + '-08',
  //     end: this.yearMonth + '-10'
  //   }];
  //   console.log(this.eventsModel);
    
  // } 