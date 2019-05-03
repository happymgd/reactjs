import React from 'react';
import { bool, func, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import {  required, composeValidators } from '../../util/validators';
import { Form, Button, FieldTextInput } from '../../components';

import css from './EditListingSessionForm.css';



const EditListingSessionFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        className,
        disabled,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateError,
        updateInProgress,
      } = fieldRenderProps;

    
      const durationMessage = intl.formatMessage({ id: 'EditListingSessionForm.durationLabel' });
      const durationPlaceholderMessage = intl.formatMessage({
        id: 'EditListingSessionForm.durationPlaceholder',
      });
      const durationRequiredMessage = intl.formatMessage({
        id: 'EditListingSessionForm.durationRequired',
      });
      const sessionMessage = intl.formatMessage({
        id: 'EditListingSessionForm.sessionLabel',
      });
      const sessionPlaceholderMessage = intl.formatMessage({
        id: 'EditListingSessionForm.sessionPlaceholder',
      });
      const sessionRequiredMessage = intl.formatMessage({
        id: 'EditListingSessionForm.sessionRequired',
      });

      const errorMessage = updateError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingSessionForm.updateFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}

          <FieldTextInput
            id="session"
            name="session"
            className={css.session}
            type="textarea"
            label={sessionMessage}
            placeholder={sessionPlaceholderMessage}
            validate={composeValidators(required(sessionRequiredMessage))}
          />


<FieldTextInput
            id="duration"
            name="duration"
            className={css.session}
            type="text"
            label={durationMessage}
            placeholder={durationPlaceholderMessage}
            maxLength={5}
            validate={composeValidators(required(durationRequiredMessage))}
            autoFocus
          />

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingSessionFormComponent.defaultProps = {  updateError: null };

EditListingSessionFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired
};

export default compose(injectIntl)(EditListingSessionFormComponent);
