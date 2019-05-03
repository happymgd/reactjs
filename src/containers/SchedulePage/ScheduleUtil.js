import * as moment from 'moment';
import { safeGet, flattenArray, replaceAt, randColor } from '../../util/array';

const mapDay = {
  mon: 0,
  tue: 1,
  wed: 2,
  thu: 3,
  fri: 4,
  sat: 5,
  sun: 6,
};
const mapIsoDay = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const eventsColorClass = ['cyan', 'velvet', 'blue', 'orange', 'yellow', 'green'];
/**
 * turn day/start/end into Date
 *
 * @param {*} dayOfWeek
 * @param {*} weekIndex
 * @param {*} time
 * @returns
 */
function makeScheduleDate(dayOfWeek, weekIndex, time) {
  let day = moment()
    .week(weekIndex)
    .startOf('week')
    .add(dayOfWeek, 'day');
  const parsedTime = moment(time, 'HH:mm');
  day.set({
    hour: parsedTime.get('hour'),
    minute: parsedTime.get('minute'),
    second: parsedTime.get('second'),
  });
  return day.toDate();
}
//front end demo. To be deleted
export function getFormatedAvailability(list, offsetCurrent){
  const res=   list.reduce((acc, curr, idx) => {
    const color = randColor(eventsColorClass, idx);
    const slots = safeGet(curr, 'attributes', 'availabilityPlan');

    if (!!slots) {
      const weekIndex = parseInt(moment().format('WW'), 10) + offsetCurrent;
      const formated = slots.entries.map((entry, index) => ({
        end: makeScheduleDate(mapDay[entry.dayOfWeek], weekIndex, entry.endTime),
        start: makeScheduleDate(mapDay[entry.dayOfWeek], weekIndex, entry.startTime),
        uuid: curr.id.uuid,
        resourceId: curr.id.uuid,
        id: curr.id.uuid,
        title: curr.attributes.title,
        resource: {
          ...entry,
          resourceId: curr.id.uuid,
          publicData: curr.attributes.publicData,
          price: curr.attributes.price,
          eventClasses: color,
        },
        index, //add index as id for own list entries
      }));
      return [...acc, ...formated];
    }
    return [...acc];
  }, []);
  return res
}
/**
 * format select options with selected attrubute && uuid
 *
 * @param {*} list
 * @returns
 */
function formatFilterOptions(list){
  return list
    .filter(item => !!item)
    .reduce(
      (acc, curr) => [
        ...acc,
        ...[{ uuid: curr.id.uuid, selected: true, attributes: curr.attributes }],
      ],
      []
    );
}
export function makeViewPlanning(list, offsetCurrent, updatedSeletion, hasAppliedFitler) {
  const pl = list.reduce((acc, curr, idx) => {
    const color = randColor(eventsColorClass, idx);
    const slots = safeGet(curr, 'attributes', 'availabilityPlan');
    if (!!slots) {
      const weekIndex = parseInt(moment().format('WW'), 10) + offsetCurrent;
     
        const mapweekList  = [];
        mapweekList['mon']=0;
        mapweekList['tue']=1;
        mapweekList['wed']=2;
        mapweekList['thu']=3;
        mapweekList['fri']=4;
        mapweekList['sat']=5;
        mapweekList['sun']=6;

        const id = curr.id.uuid;
        const availabilityPlan  = [
          { uuid: 'mon', dayOfWeek: 'mon', label: 'Lundi' ,selected: false , startTime: "", endTime:"" },
          { uuid: 'tue', dayOfWeek: 'tue', label: 'Mardi' ,selected: false , startTime: "", endTime:"" },
          { uuid: 'wed', dayOfWeek: 'wed', label: 'Mercredi' ,selected: false , startTime: "", endTime:"" },
          { uuid: 'thu', dayOfWeek: 'thu', label: 'Jeudi' ,selected: false , startTime: "", endTime:"" },
          { uuid: 'fri', dayOfWeek: 'fri', label: 'Vendredi' ,selected: false , startTime: "", endTime:"" },
          { uuid: 'sat', dayOfWeek: 'sat', label: 'Samedi' ,selected: false , startTime: "", endTime:"" },
          { uuid: 'sun', dayOfWeek: 'sun', label: 'Dimanche' ,selected: false , startTime: "", endTime:"" }];
          
  
          curr.attributes.availabilityPlan.entries.forEach(element => {
            availabilityPlan[mapweekList[element.dayOfWeek]].selected = true;
            availabilityPlan[mapweekList[element.dayOfWeek]].startTime = element.startTime;
            availabilityPlan[mapweekList[element.dayOfWeek]].endTime = element.endTime;
        });
      
        const options ={
          id : id,
          availabilityPlan: availabilityPlan,
        };
        
        const formated = slots.entries.map((entry, index) => ({
        end: makeScheduleDate(mapDay[entry.dayOfWeek], weekIndex, entry.endTime),
        start: makeScheduleDate(mapDay[entry.dayOfWeek], weekIndex, entry.startTime),
        uuid: curr.id.uuid,
        resourceId: curr.id.uuid,
        id: curr.id.uuid,
        title: curr.attributes.title,
        resource: {
          ...entry,
          resourceId: curr.id.uuid,
          publicData: curr.attributes.publicData,
          availabilityPlan: curr.attributes.availabilityPlan,
          options: options,
          price: curr.attributes.price,
          eventClasses: color,
        },
        index, //add index as id for own list entries
      }));
      return [...acc, ...[{ source: curr, viewPlanning: formated }]];
    }
    return [...acc, ...[{ source: curr, viewPlanning: [] }]];
  }, []);
  const options =  formatFilterOptions(list) 
  const selectedOption = !hasAppliedFitler ? options : updatedSeletion;
  const view = flattenArray(pl.map(sl => sl.viewPlanning)).filter(timeslot => {
    if (!hasAppliedFitler) {
      return true;
    }
    const selectedTime = updatedSeletion.filter(t => !!t.selected).map(slot => slot.uuid);
    return selectedTime.includes(timeslot.uuid);
  });
  return {
    options: selectedOption,
    view,
  };
}

export function makeEventViewList(list, listing,updatedSeletion, hasAppliedFitler) {
  const formatedList = list.reduce((acc, curr, idx) => {
    return [
      ...acc,
      ...[
        {
          id: curr.id,
          uuid: curr.id,
          start: moment(curr.attributes.start).toDate(),
          end: moment(curr.attributes.end).toDate(),
          resourceId: curr.id,
          index: idx,
          title: curr.attributes.title,
          resource: { ...curr.attributes },
        },
      ],
    ];
  }, []);

  const  options =  formatFilterOptions(listing) 
  const selectedOption = !hasAppliedFitler ? options : updatedSeletion;
  const view = formatedList.filter(listEvent => {
    if (!hasAppliedFitler) {
      return true;
    }
    const selectedTime = updatedSeletion.filter(t => !!t.selected).map(listEvent => listEvent.uuid);
    return selectedTime.includes(listEvent.uuid);
  });
  return {
    options: selectedOption,
    view,
  };
}

export function getWeekOffset(newDate) {
  const current = parseInt(moment().format('WW'), 10);
  const projected = parseInt(moment(newDate).format('WW'), 10);
  return projected - current;
}

export function makeSchedulePayload(listings, value) {
  const { start, end, event } = value;
  const { resource } = event;
  const updatedItem = makeEntryPayload(start, end, resource.seats);
  const updatedList = listings.reduce((acc, curr) => {
    if (curr.id.uuid === event.uuid) {
      const {
        attributes: { availabilityPlan },
      } = curr;
      if (!availabilityPlan) {
        return [...acc, ...[curr]];
      }
      const updateAvail = {
        ...availabilityPlan,
        entries: replaceAt(availabilityPlan.entries, event.index, updatedItem),
      };
      return [
        ...acc,
        ...[{ ...curr, attributes: { ...curr.attributes, availabilityPlan: updateAvail } }],
      ];
    }
    return [...acc, ...[curr]];
  }, []);

  const updatedlistItem = listings
    .filter(l => l.id.uuid === event.uuid)
    .map(item => ({
      ...item,
      attributes: {
        ...item.attributes,
        availabilityPlan: {
          ...item.attributes.availabilityPlan,
          entries: replaceAt(item.attributes.availabilityPlan.entries, event.index, updatedItem),
        },
      },
    }));

  return { item: updatedItem, list: updatedList, listItem: updatedlistItem };
}

function makeEntryPayload(start, end, seats) {
  const [startHour, startMinute, startDay] = formatListingDate(start);
  //const [endHour, endMinute, endDay] = formatListingDate(end);
  const [endHour, endMinute] = formatListingDate(end);

  return {
    dayOfWeek: startDay,
    startTime: `${startHour}:${startMinute}`,
    endTime: `${endHour}:${endMinute}`,
    seats,
  };
}
function formatListingDate(date) {
  const hour = padTime(moment(date).get('hour'));
  const minute = padTime(moment(date).get('minute'));
  const day = mapIsoDay[moment(date).isoWeekday()];

  return [hour, minute, day];
}
const padTime = time => time.toString().padStart(2, '0');
