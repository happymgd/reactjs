import React, { Component } from 'react';
import { string, bool, arrayOf } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames';
//import moment from 'moment';
//import { required, bookingDatesRequired, composeValidators } from '../../util/validators';
//import { START_DATE, END_DATE } from '../../util/dates';
import { propTypes } from '../../util/types';
import config from '../../config';
//import { Form, PrimaryButton } from '../../components';
import { Form, PrimaryButton, Appointement } from '../../components';
//import { Form, PrimaryButton, FieldDateRangeInput, Appointement } from '../../components';
//import {  PrimaryButton} from '../../components';
import EstimatedBreakdownMaybe from './EstimatedBreakdownMaybe';


import css from './BookingDatesForm.css';

         


export class BookingDatesFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { focusedInput: null,  HideToolTip : true };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onFocusedInputChange = this.onFocusedInputChange.bind(this);
    
  }

  // Function that can be passed to nested components
  // so that they can notify this component when the
  // focused input changes.
  onFocusedInputChange(focusedInput) {
    this.setState({ focusedInput });
  }

  handleChange(event){
    
    if (this.state.HideToolTip === true){
      this.setState({HideToolTip : false});
    }else
    {
      this.setState({HideToolTip : true});
    
}
    }

  // In case start or end date for the booking is missing
  // focus on that input, otherwise continue with the
  // default handleSubmit function.
  handleFormSubmit(e) {
   /* const { startDate, endDate } = e.bookingDates || {};
    if (!startDate) {
     // e.preventDefault();
      this.setState({ focusedInput: START_DATE });
    } else if (!endDate) {
     // e.preventDefault();
      this.setState({ focusedInput: END_DATE });
    } else {
      this.props.onSubmit(e);
    }
    */

    this.props.onSubmit(e);

    //console.log(e);
  }
  
   

  render() {
    const { rootClassName, className, phone, price: unitPrice, duration_hours,duration_minutes, ...rest } = this.props;
      /*const style =this.state.HideToolTip ? {display : 'none'} : {};
      const style2 =this.state.HideToolTip ? {} : {display : 'none'};
      */
    const classes = classNames(rootClassName || css.root, className);

    
 

    if (!unitPrice) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingPriceMissing" />
          </p>
        </div>
      );
    }
    if (unitPrice.currency !== config.currency) {
      return (
        <div className={classes}>
          <p className={css.error}>
            <FormattedMessage id="BookingDatesForm.listingCurrencyInvalid" />
          </p>
        </div>
      );
    }

   
    return (
      <FinalForm
        {...rest}
        unitPrice={unitPrice}
        onSubmit={this.handleFormSubmit}
        render={fieldRenderProps => {
          const {
            //endDatePlaceholder,
            //startDatePlaceholder,
            //form,
            handleSubmit,
            //intl,
            //isOwnListing,
            submitButtonWrapperClassName,
            unitPrice,
            unitType,
            values,
            timeSlots,
            fetchTimeSlotsError,
          } = fieldRenderProps;

 //console.log(timeSlots);

 function addTimes(date, hours, minutes) {
  var result = new Date(date);
  result.setHours( result.getHours() + hours );
  result.setMinutes( result.getMinutes() + minutes );
  return result;
}

function makeEntries(entry, duration_hours, duration_minutes) {
  var entries =[];
  var dateStart = entry.attributes.start;
  var dateEnd = entry.attributes.end;
  var date = new Date(dateStart);
  var dateTest = addTimes (date,duration_hours,duration_minutes );
   while(dateTest<=dateEnd)
  {
  var str = date.getHours();
    str += ':'+(date.getMinutes()<10?'0':'')+date.getMinutes();
    entries.push({
      time: str,
      bookingStart: date,
      bookingEnd: dateTest,
      seats: 1
    });

    date = addTimes ( date, duration_hours, duration_minutes  );
    dateTest = addTimes ( dateTest, duration_hours, duration_minutes  );
  }
  //console.log(entries);
  return entries
  
  };
        const mockTimeSlot=timeSlots ? timeSlots.map(slot=>({...slot, entries: makeEntries(slot,duration_hours,duration_minutes)
      })):[]

      var appointment = null;
      if (!!duration_hours && !!duration_hours &&((duration_hours!==0) ||  (duration_hours!==0)))
      {
         appointment = <Appointement slots={mockTimeSlot}  onResults={this.handleFormSubmit}/>;
      }
      
  
          const { startDate, endDate } = values && values.bookingDates ? values.bookingDates : {};
/*
          const bookingStartLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingStartTitle',
          });
          const bookingEndLabel = intl.formatMessage({ id: 'BookingDatesForm.bookingEndTitle' });
          const requiredMessage = intl.formatMessage({ id: 'BookingDatesForm.requiredDate' });
          const startDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidStartDate',
          });
          const endDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidEndDate',
          });
          */
          const timeSlotsError = fetchTimeSlotsError ? (
            <p className={css.timeSlotsError}>
              <FormattedMessage id="BookingDatesForm.timeSlotsError" />
            </p>
          ) : null;

          // This is the place to collect breakdown estimation data. See the
          // EstimatedBreakdownMaybe component to change the calculations
          // for customized payment processes.
          const bookingData =
            startDate && endDate
              ? {
                  unitType,
                  unitPrice,
                  startDate,
                  endDate,

                  // NOTE: If unitType is `line-item/units`, a new picker
                  // for the quantity should be added to the form.
                  quantity: 1,
                }
              : null;
          const bookingInfo = bookingData ? (
            <div className={css.priceBreakdownContainer}>
              <h3 className={css.priceBreakdownTitle}>
                <FormattedMessage id="BookingDatesForm.priceBreakdownTitle" />
              </h3>
              <EstimatedBreakdownMaybe bookingData={bookingData} />
            </div>
          ) : null;
/*
          const dateFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          };

          const now = moment();
         const today = now.startOf('day').toDate();
          const tomorrow = now
            .startOf('day')
            .add(1, 'days')
            .toDate();
         const startDatePlaceholderText =
            startDatePlaceholder || intl.formatDate(today, dateFormatOptions);
          const endDatePlaceholderText =
            endDatePlaceholder || intl.formatDate(tomorrow, dateFormatOptions);
         */
            const submitButtonClasses = classNames(
            submitButtonWrapperClassName || css.submitButtonWrapper
          );

const slicePhonePanel = numbers => {
 
  if (numbers.slice(0, 3) ==="+32")
    return `0${numbers.slice(3, 5)} ${numbers.slice(5, 7)} ${numbers.slice(7, 9)} ${numbers.slice(9, 11)}`;
 if (numbers.slice(0, 3) ==="+33")
    return `0${numbers.slice(3, 4)} ${numbers.slice(4, 6)} ${numbers.slice(6, 8)} ${numbers.slice(8, 10)} ${numbers.slice(10, 12)}`;
  else {
    return `${numbers}`;
  
  }
};
const slicePhoneCall = numbers => {
 
    return `tel:${numbers}`;
  
};
/*
const lien = phone === null  ?
(
  <div className={submitButtonClasses}>
 
              <a className={css.button} href="tel:+33143625964" > <PrimaryButton >
                  <FormattedMessage id="BookingDatesForm.requestToBook" />
                </PrimaryButton></a>
                
            </div> 
) : (
<div className={submitButtonClasses}>
 
              <a className={css.button} href={slicePhoneCall(phone)} > <PrimaryButton >
               Appelez moi au {slicePhonePanel(phone)}
                </PrimaryButton></a>
                
            </div> 
);*/

const lien =
(
  <div className={submitButtonClasses}>
 
              <a className={css.button} href="tel:+33143625964" > <PrimaryButton >
                  <FormattedMessage id="BookingDatesForm.requestToBook" />
                </PrimaryButton></a>
                
            </div> 
);

          return (
       <div >
        {       /*     <div  onClick={this.handleChange} style={style2}>
                     <PrimaryButton onClick={()=>"gtag_report_conversion('https://www.guerizen.com/')" }>
                  Afficher le numéro
                </PrimaryButton></div>
      style={style} dans la div d'en dessous   */} 
              <div >
                  {lien}
              </div>
             <br/>
              <br/> 

                          <Form onSubmit={handleSubmit} className={classes}>
              {timeSlotsError}

              
            {appointment}
{/*          <FieldDateRangeInput
                className={css.bookingDates}
                name="bookingDates"
                unitType={unitType}
                startDateId={`${form}.bookingStartDate`}
                startDateLabel={bookingStartLabel}
                startDatePlaceholderText={startDatePlaceholderText}
                endDateId={`${form}.bookingEndDate`}
                endDateLabel={bookingEndLabel}
                endDatePlaceholderText={endDatePlaceholderText}
                focusedInput={this.state.focusedInput}
                onFocusedInputChange={this.onFocusedInputChange}
                format={null}
                timeSlots={timeSlots}
                useMobileMargins
                validate={composeValidators(
                  required(requiredMessage),
                  bookingDatesRequired(startDateErrorMessage, endDateErrorMessage)
                )}
              />  */}
              {bookingInfo}
           {/*    <p className={css.smallPrint}>
                <FormattedMessage
                  id={
                    isOwnListing
                      ? 'BookingDatesForm.ownListing'
                      : 'BookingDatesForm.youWontBeChargedInfo'
                  }
                />
              </p>
              <div className={submitButtonClasses}>
                <PrimaryButton type="submit">
                  <FormattedMessage id="BookingDatesForm.request" />
                </PrimaryButton>
                </div>*/}
            </Form>
            </div>
          );
        }}
      />
    );
  }
}

BookingDatesFormComponent.defaultProps = {
  listing: null,
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  price: null,
  phone: null,
  isOwnListing: false,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  timeSlots: null,
};

BookingDatesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  unitType: propTypes.bookingUnitType.isRequired,
  price: propTypes.money,
  isOwnListing: bool,
  timeSlots: arrayOf(propTypes.timeSlot),

  // from injectIntl
  intl: intlShape.isRequired,

  // for tests
  startDatePlaceholder: string,
  endDatePlaceholder: string,
};

const BookingDatesForm = compose(injectIntl)(BookingDatesFormComponent);
BookingDatesForm.displayName = 'BookingDatesForm';

export default BookingDatesForm;
