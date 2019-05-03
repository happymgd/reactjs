import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ModalInMobile, Button } from '../../components';
import { BookingDatesForm } from '../../forms';

import css from './ListingPage.css';

// This defines when ModalInMobile shows content as Modal
const MODAL_BREAKPOINT = 1023;

const SectionBooking = props => {
  const {
    listingId,
    isOwnListing,
    isClosed,
    isBook,
    duration_hours,
    duration_minutes,
    unitType,
    price,
    phone,
    //formattedPrice,
    //priceTitle,
    handleBookingSubmit,
    richTitle,
    authorDisplayName,
   // handleBookButtonClick,
    handleMobileBookModalClose,
    onManageDisableScrolling,
    timeSlots,
    fetchTimeSlotsError,
  } = props;
  //const showClosedListingHelpText = listing.id && isClosed;
  const bookingTitleLabel = richTitle.slice(0, 1) === "H" || richTitle.slice(0, 1) === "A" || richTitle.slice(0, 1) === "E" || richTitle.slice(0, 1) === "I" || richTitle.slice(0, 1) === "O"|| richTitle.slice(0, 1) === "U" ?
(
    <h2 className={css.bookingTitle}>
          <br/> 
            Prenez rendez-vous pour une séance d' {richTitle}
          </h2> 
 ) :(
    <h2 className={css.bookingTitle}>
          <br/> 
            Prenez rendez-vous pour une séance de {richTitle}
          </h2> 
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
const lien = (typeof(phone) === 'undefined')  ?
(
  <div >
 
              <a className={css.button} href="tel:+33143625964"  onClick={()=> "gtag_report_conversion('https://www.guerizen.com/')"}> <Button rootClassName={css.bookButton}>
                  Appelez moi au 01 43 62 59 64
                </Button></a>
                
            </div> 
) : (
<div >
 
              <a className={css.button} href={slicePhoneCall(phone)} > <Button rootClassName={css.bookButton}>
               Appelez moi au {slicePhonePanel(phone)}
                </Button></a>
                
            </div> 
);*/

const lien = 
(
  <div >
 
              <a className={css.button} href="tel:+33143625964"  onClick={()=> "gtag_report_conversion('https://www.guerizen.com/')"}> <Button rootClassName={css.bookButton}>
                  Appelez moi au 01 43 62 59 64
                </Button></a>
                
            </div> 
);

  return (
    <div>
      <ModalInMobile
        className={css.modalInMobile}
        containerClassName={css.modalContainer}
        id="BookingDatesFormInModal"
        isModalOpenOnMobile={isBook}
        onClose={handleMobileBookModalClose}
        showAsModalMaxWidth={MODAL_BREAKPOINT}
        onManageDisableScrolling={onManageDisableScrolling}
      >
        <div className={css.modalHeading}>
          <h1 className={css.title}>{richTitle}</h1>
          <div className={css.author}>
            <span className={css.authorName}>
              <FormattedMessage id="ListingPage.hostedBy" values={{ name: authorDisplayName }} />
            </span>
          </div>
        </div>

        <div className={css.bookingHeading}>

         {bookingTitleLabel}
          
        </div>
        {!isClosed ? (
          <BookingDatesForm
            listingId={listingId}
            className={css.bookingForm}
            submitButtonWrapperClassName={css.bookingDatesSubmitButtonWrapper}
            unitType={unitType}
            onSubmit={handleBookingSubmit}
            price={price}
            phone={phone}
            isOwnListing={isOwnListing}
            timeSlots={timeSlots}
            fetchTimeSlotsError={fetchTimeSlotsError}
            duration_hours={duration_hours}
            duration_minutes={duration_minutes}
          />
        ) : null}
      </ModalInMobile>
      <div className={css.openBookingForm}>
     

        {!isClosed ? (
          <div className={css.phonebutton}>{lien}</div>
        ) : (
          <div className={css.closedListingButton}>
            <FormattedMessage id="ListingPage.closedListingButtonText" />
          </div>
        )}
      </div>
    </div>
  );
};

/* line 119
   <div className={css.priceContainer}>
          <div className={css.priceValue} title={priceTitle}>
            {formattedPrice}
          </div>
          <div className={css.perUnit}>
            <FormattedMessage id="ListingPage.perUnit" />
          </div>
        </div>

        */

export default SectionBooking;
