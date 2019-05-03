import React, { Component } from 'react';
import { Form, Field} from 'react-final-form';
import PropTypes from 'prop-types';
import { AppointementWeekListFilter } from './../AppointementListFilter/AppointementWeekListFilter';
import moment from 'moment';

import { LINE_ITEM_DAY, LINE_ITEM_NIGHT, TIME_SLOT_DAY } from '../../util/types';
// import { safeGet } from '../../util/array';


import css from './EditEvent.css';


const onSubmit = f => {
  console.log('submit', f);
};

const categories = [
  { value: 'Hypnothérapie', viewValue: 'Hypnothérapie' },
  { value: 'Développement', viewValue: 'Développement' },
];

const SelectEventCategory = ({ name }) => (
  <div>
    <label>Favorite Color</label>
    <Field name={`${name}.category`} component="select">
      {categories.map(cat => <option  key={cat.value} value={cat.value}>{cat.viewValue}</option>)}
    </Field>
  </div>
)
const PublicData = ({ name }) => (
  <React.Fragment>
    <div>
      <Field
        name={`${name}.session`}
        placeholder="sestion description"
        render={({ input, meta }) => (
          <div>
            <label>Session</label>
            <textarea {...input} />
            {meta.touched && meta.error && <span>{meta.error}</span>}
          </div>
        )}
      />
    </div>
    <div>
      <label>Address</label>
      <Field name={`${name}.location.address`} placeholder="Address" component="input" />
    </div>
  </React.Fragment>
);


class EditEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    
  const { datum, options,isEditable, isEditing ,onChange,onSubmit} = this.props;

  const dateFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };

  /*const now = moment();
  const today = now.startOf('day').toDate();
  const tomorrow = now
    .startOf('day')
    .add(1, 'days')
    .toDate();
  const startDatePlaceholderText = intl.formatDate(today, dateFormatOptions);
  const endDatePlaceholderText = intl.formatDate(tomorrow, dateFormatOptions);
  */
//console.log(datum);
const bookingStartLabel = "date de début";

const bookingEndLabel = "date de fin";


  
  /*
  let title = isEditable ? "modifier " : "créer ";
  title += isEditing ? "un créneau" : "un rendez-vous";
*/
   let title ="";
  if (isEditing)
  {
    title = "modifier les créneaux horaires"
    return (
   
      <AppointementWeekListFilter datum={datum} 
      onSubmit={onSubmit}
      onChange={onChange}
       title={title} options={options}  />
  

);
   
    
  }
  else
  {
    title = isEditable ? "modifier un rendez-vous" : "créer un rendez-vous";
    return (
   
      <Form
      onSubmit={onSubmit}
      //validate={validate}
      initialValues={datum}
      render={({ handleSubmit, pristine, invalid, values }) => (
        <form onSubmit={handleSubmit}>
          <h2>{title}</h2>
          <div>
            <label>Title</label>
            <Field name="title" component="input" placeholder="Title" />
          </div>
          <div>
   {/*       <FieldDateRangeInput
                className={css.bookingDates}
                name="bookingDates"
                unitType={TIME_SLOT_DAY}
                startDateId={'start'}
                startDateLabel={bookingStartLabel}
                //startDatePlaceholderText={startDatePlaceholderText}
                endDateId={`end`}
                endDateLabel={bookingEndLabel}
                //endDatePlaceholderText={endDatePlaceholderText}
                //focusedInput={this.state.focusedInput}
               // onFocusedInputChange={this.onFocusedInputChange}
                format={null}
                //timeSlots={timeSlots}
                useMobileMargins
                /*validate={composeValidators(
                  required(requiredMessage),
                  bookingDatesRequired(startDateErrorMessage, endDateErrorMessage)
                )}
                />*/}
               </div>
{/*
          <div>
            <label>Price</label>
            <Field
              name="resource.price.amount"
              component="input"
              type="number"
              placeholder="Price"
              parse={val => parseInt(val, 10)}
            />
          </div>

          <SelectEventCategory name="resource.publicData" />

          <PublicData name="resource.publicData" />
          */}

          <button type="submit" disabled={pristine || invalid}>
            Submit
          </button>
        </form>
      )}
    />

);
  }
  
  //console.log(datum);
  
  }
}


const { object, func, bool } = PropTypes;
EditEvent.defaultProps = {
  datum: {
    title: null,
    resource: {
      price: {
        amount: null,
      },
      publicData: {
        location: {
          address: null,
          buildings: null,
        },
        session: null,
        seats: null,
      },
    },
  },
  isEditing: false,
  isEditable: false,
};
EditEvent.propTypes = {
  datum: object.isRequired,
  isEditing: bool.isRequired,
  isEditable: bool.isRequired,
  onChange: func,
};

export default EditEvent;
