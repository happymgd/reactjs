import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ListingLink } from '../../components';
import { EditListingSessionForm } from '../../forms';
import { ensureOwnListing } from '../../util/data';
import moment from 'moment';


import css from './EditListingSessionPanel.css';



const EditListingSessionPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { publicData } = currentListing.attributes;
  const  session = publicData && publicData.session;
  const duration_hours = publicData && publicData.duration_hours ? publicData.duration_hours : 0;
  const duration_minutes = publicData && publicData.duration_minutes? publicData.duration_minutes : 0;
  let date = new Date();
  date.setHours(duration_hours);
  date.setMinutes(duration_minutes);
  
  const duration = moment(date).format("HH:mm");

  const initialValues = { session: session, duration: duration};
  

   const panelTitle = currentListing.id ? (
    <FormattedMessage
      id="EditListingSessionPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingSessionPanel.createListingTitle" />
  );

   


  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingSessionForm
      className={css.form}
      initialValues={initialValues}
     onSubmit={values => {
          const { session, duration } = values;          
    const duration_hours = parseInt(duration.split(':')[0],10);
    const duration_minutes = parseInt(duration.split(':')[1],10);
          const updateValues = {
            publicData: { session, duration_hours, duration_minutes },
          };
          onSubmit(updateValues);
        }}
      onChange={onChange}
      saveActionMsg={submitButtonText}
      updated={panelUpdated}
      updateError={errors.updateListingError}
      updateInProgress={updateInProgress}
    />
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingSessionPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingSessionPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingSessionPanel;
