import React, { PureComponent } from 'react';
import BigCalendar from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import css from './DnDSchedule.css';
import { getWeekOffset } from '../../containers/SchedulePage/ScheduleUtil';
import { ModalSchedule } from '..';
/* 
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css"; */

//const moment = require('moment');
const localizer = BigCalendar.momentLocalizer(moment);
let formats = {
  dayFormat: (date, culture, localizer) =>
    localizer.format(date, 'ddd DD MMM', culture),
  dayHeaderFormat: (date, culture, localizer) =>
  localizer.format(date, "ddd DD MMM", culture),
  dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
  localizer.format( start, "DD MMMM", culture) + " - " + localizer.format(end, "DD MMMM", culture),
}
const DnDCalendar = withDragAndDrop(BigCalendar);
const ADD_12AM = 7;
const SUBSTRACT_12AM = -3;
class DnDSchedule extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      viewType: 'week',
      modalIsOpen: false,
      value: {
        type: null,
        datum: null,
      },
      options: {id:0 , availabilityPlan:[] },
      element: [],

      availabilites: [],
    };
    this.min = moment()
      .startOf('day')
      .add(ADD_12AM, 'hour')
      .toDate();
    this.max = moment()
      .startOf('day')
      .add(SUBSTRACT_12AM, 'hour')
      .toDate();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.slots !== this.props.slots && this.state.availabilites.length === 0) {
      this.setState({ availabilites: this.props.slots });
    }
  }
  onTimeslotChange = type => this.props.onChange(type);


  onNavigate = newDate => {
    const weekOffset = getWeekOffset(newDate);
    if (weekOffset < 0) {
      return;
    }
    this.props.onDateNav(weekOffset);
  };
  onView = type => this.setState({ viewType: `${type}+s` });

  slotStyle = date => {
    const { isEditingSlot } = this.props;
    if (isEditingSlot) {
      return null;
    }
    const hasMatch = this.state.availabilites.reduce((acc, curr) => {
      if (!!acc) {
        return true;
      }
      return moment(date).isBetween(moment(curr.start), moment(curr.end))
    }, false);

    const style = {};

    return {
      className: `${hasMatch?'available__slot':null}`,
      style,
    };
  };
  eventStyle = event => {
    const {
      resource: { eventClasses },
    } = event;
    const style = {
      border: '0px',
      display: 'block',
    };
    return {
      className: `${eventClasses}__event`,
      style: style,
    };
  };

  onSelectEvent = event => {
    this.setState({ options: event.resource.options,modalIsOpen: true, value: { datum: event, type: 'event' } });
    //console.log(event);
  }
  onSelectSlot = slots => {
    this.setState({ options: {id:0 , availabilityPlan:[] },modalIsOpen: true, value: { datum: slots, type: 'slot' } });
    //console.log(slots);
  }
  WeekListonChange = chng => {
    
    if (!!chng) {
      const {
        values: { listing },
      } = chng;
      
      console.log(this.state.options);
      let list =null;
      if (!!this.state.options) {
          list ={
          id: this.state.options.id,
          availabilityPlan: listing,
          };
        }  
      else {
          list ={
          id: 0,
          availabilityPlan: listing,
         };
        }
      if (listing) {
        this.setState({ options: list });
      }
    //console.log(listing);
  }
}

WeekListonSubmit = options => this.props.updateListingSchedule(options);
/*
  WeekListonSubmit = options => {
   

    
    console.log(this.updateListingSchedule);
    

    if (!!options) {
      
      let values = [];
      options.forEach(option => option.selected ? values=values.concat([{ 
        dayOfWeek: option.dayOfWeek,
        seats: 1,
        startTime: option.startTime,
        endTime: option.endTime
      }]) : false);

      const availabilityPlan = {
        type: "availability-plan/time",
        timezone: "Europe/Paris",
        entries: values
      };
      const updateValues = {
        availabilityPlan: availabilityPlan ,
        
      };

    console.log(updateValues);
      
        this.updateListingSchedule(updateValues)
        .catch((err) => {
        
         
       });
     
      
    //console.log(listing);
  }
  
  

   //console.log(e);
    //console.log(listing);
  }
*/

  onClose = event => this.setState({ modalIsOpen: event });


  render() {
    const { viewList, isEditingSlot} = this.props;
    
    const { viewType,options} = this.state;
   
    return (
      <div className={css.wrap}>
        <DnDCalendar
          culture="fr"
          selectable
          eventPropGetter={this.eventStyle}
          slotPropGetter={this.slotStyle}
          defaultDate={new Date()}
          max={this.max}
          min={this.min}
          defaultView={viewType}
          onView={this.onView}
          events={viewList}
          //onEventDrop={this.onTimeslotChange}
          //onEventResize={this.onTimeslotChange}
          resizable
          localizer={localizer}
          onNavigate={this.onNavigate}
          views={['month', 'day', 'week', 'work_week']}
          style={{ height: '100vh', display: 'flex', flex: 1 }}
          onSelectEvent={this.onSelectEvent}
          onSelectSlot={this.onSelectSlot}
          formats={formats}
          messages={{
            month: 'Mois',
            day: 'Jour',
            week: 'Semaine',
            work_week: 'Du lundi au vendredi',
            today: "aujourd'hui",
            previous: '<',
            next: '>',
          }}
        />
        <ModalSchedule
          id="scheduleModal"
          isOpen={this.state.modalIsOpen}
          handleOnClose={this.onClose}
          onChange={this.WeekListonChange}
          onSubmit={this.WeekListonSubmit}
          value={this.state.value}
          datum={!!this.state.value.datum ? this.state.value.datum : {title: ""}}
          options={options}
          isEditing={isEditingSlot}
          isEditable={this.state.value.type==='event'}
        />
      </div>
    );
  }
}
const { string, array, func, bool } = PropTypes;
DnDSchedule.defaultProps = {
  viewType: 'day', //'month'|'week'|'work_week'|'day'|'agenda',
  slots: [],
  viewList: [],
};
DnDSchedule.propTypes = {
  viewType: string,
  //viewSlots: array,
  viewList: array,
  onDateNav: func,
  isEditingSlot: bool,
  isEditable: bool,
  slots: array,
};

export default DnDSchedule;
