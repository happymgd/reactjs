import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';
import { EditListingDescriptionForm } from '../../forms';
import config from '../../config';

import css from './EditListingDescriptionPanel.css';

const EditListingDescriptionPanel = props => {
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
  const { description, title, publicData } = currentListing.attributes;
  /*const { description, title, publicData,availabilityPlan } = currentListing.attributes;
  console.log(availabilityPlan);
  const availabilityPlan2 = {
    type: "availability-plan/time",
    timezone: "Europe/Brussels",
    entries: [
      {
        dayOfWeek: "mon",
        seats: 1,
        startTime: "08:00",
        endTime: "20:00"
      },
      {
        dayOfWeek: "tue",
        seats: 1,
        startTime: "08:00",
        endTime: "20:00"
      },
      {
        dayOfWeek: "wed",
        seats: 1,
        startTime: "08:00",
        endTime: "20:00"
      },
      {
        dayOfWeek: "thu",
        seats: 1,
        startTime: "08:00",
        endTime: "20:00"
      },
      {
        dayOfWeek: "fri",
        seats: 1,
        startTime: "08:00",
        endTime: "20:00"
      },
      {
        dayOfWeek: "sat",
        seats: 1,
        startTime: "08:00",
        endTime: "20:00"
      }
    ]
  };

  
    entries: [
      {
        dayOfWeek: "thu",
        seats: 1,
        startTime: "14:00",
        endTime: "15:00"
      },
      {
        dayOfWeek: "fri",
        seats: 1,
        startTime: "09:00",
        endTime: "10:00"
      },
      {
        dayOfWeek: "fri",
        seats: 1,
        startTime: "10:30",
        endTime: "11:30"
      }
    ]*/

  const panelTitle = currentListing.id ? (
    <FormattedMessage
      id="EditListingDescriptionPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingDescriptionPanel.createListingTitle" />
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingDescriptionForm
        className={css.form}
        initialValues={{ title, description, category: publicData.category }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { title, description, category } = values;
          const updateValues = {
            title: title.trim(),
            description,
            // availabilityPlan: availabilityPlan2 ,
            publicData: { category },
          };

          onSubmit(updateValues);
        }}
        onChange={onChange}
        updated={panelUpdated}
        updateError={errors.updateListingError}
        updateInProgress={updateInProgress}
        categories={config.custom.categories}
      />
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingDescriptionPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingDescriptionPanel.propTypes = {
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

export default EditListingDescriptionPanel;
