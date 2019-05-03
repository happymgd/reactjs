import React from 'react';
import { string, bool } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Form as FinalForm } from 'react-final-form';
import classNames from 'classnames';
import { Form, PrimaryButton, FieldTextInput, IconEnquiry } from '../../components';
import * as validators from '../../util/validators';
import { propTypes } from '../../util/types';



import moment from 'moment';

import css from './EnquiryForm.css';



const EnquiryFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      const {
        rootClassName,
        className,
        currentUser,
        isBooking,
        BookingInfo,
        BookingValues,
        submitButtonWrapperClassName,
        formId,
        handleSubmit,
        inProgress,
        intl,
        listingTitle,
        authorDisplayName,
        sendEnquiryError,
      } = fieldRenderProps;

      const messageLabel = intl.formatMessage(
        {
          id: 'EnquiryForm.messageLabel',
        },
        { authorDisplayName }
      );
      const messagePlaceholder = intl.formatMessage(
        {
          id: 'EnquiryForm.messagePlaceholder',
        },
        { authorDisplayName }
      );
      const messageRequiredMessage = intl.formatMessage({
        id: 'EnquiryForm.messageRequired',
      });
      const messageRequired = validators.requiredAndNonEmptyString(messageRequiredMessage);


      // email
      const emailLabel = intl.formatMessage({
        id: 'SignupForm.emailLabel',
      });
      const emailPlaceholder = intl.formatMessage({
        id: 'SignupForm.emailPlaceholder',
      });
      const emailRequiredMessage = intl.formatMessage({
        id: 'SignupForm.emailRequired',
      });
      const emailRequired = validators.required(emailRequiredMessage);
      const emailInvalidMessage = intl.formatMessage({
        id: 'SignupForm.emailInvalid',
      });
      const emailValid = validators.emailFormatValid(emailInvalidMessage);

   // password
      const passwordLabel = intl.formatMessage({
        id: 'SignupForm.passwordLabel',
      });
      const passwordPlaceholder = intl.formatMessage({
        id: 'SignupForm.passwordPlaceholder',
      });
      const passwordRequiredMessage = intl.formatMessage({
        id: 'SignupForm.passwordRequired',
      });
      const passwordMinLengthMessage = intl.formatMessage(
        {
          id: 'SignupForm.passwordTooShort',
        },
        {
          minLength: validators.PASSWORD_MIN_LENGTH,
        }
      );
      const passwordMaxLengthMessage = intl.formatMessage(
        {
          id: 'SignupForm.passwordTooLong',
        },
        {
          maxLength: validators.PASSWORD_MAX_LENGTH,
        }
      );
      const passwordMinLength = validators.minLength(
        passwordMinLengthMessage,
        validators.PASSWORD_MIN_LENGTH
      );
      const passwordMaxLength = validators.maxLength(
        passwordMaxLengthMessage,
        validators.PASSWORD_MAX_LENGTH
      );
      const passwordRequired = validators.requiredStringNoTrim(passwordRequiredMessage);
      const passwordValidators = validators.composeValidators(
        passwordRequired,
        passwordMinLength,
        passwordMaxLength
      );

      // firstName
      const firstNameLabel = intl.formatMessage({
        id: 'SignupForm.firstNameLabel',
      });
      const firstNamePlaceholder = intl.formatMessage({
        id: 'SignupForm.firstNamePlaceholder',
      });
      const firstNameRequiredMessage = intl.formatMessage({
        id: 'SignupForm.firstNameRequired',
      });
      const firstNameRequired = validators.required(firstNameRequiredMessage);

      // lastName
      const lastNameLabel = intl.formatMessage({
        id: 'SignupForm.lastNameLabel',
      });
      const lastNamePlaceholder = intl.formatMessage({
        id: 'SignupForm.lastNamePlaceholder',
      });
      const lastNameRequiredMessage = intl.formatMessage({
        id: 'SignupForm.lastNameRequired',
      });

      const lastNameRequired = validators.required(lastNameRequiredMessage);
// phone
const PhoneLabel = intl.formatMessage({
  id: 'SignupForm.PhoneLabel',
});
const PhonePlaceholder = intl.formatMessage({
  id: 'SignupForm.PhonePlaceholder',
});
const PhoneRequiredMessage = intl.formatMessage({
  id: 'SignupForm.PhoneRequired',
});
 const PhoneRequired = validators.required(PhoneRequiredMessage);

      const classes = classNames(rootClassName || css.root, className);
      const submitInProgress = inProgress;
      const submitDisabled = submitInProgress;


const inputtext = (!currentUser)  ?
(
  <div>
  <FieldTextInput
              type="email"
              id={formId ? `${formId}.email` : 'email'}
              name="email"
              autoComplete="email"
              label={emailLabel}
              placeholder={emailPlaceholder}
              validate={validators.composeValidators(emailRequired, emailValid)}
            />
            <div className={css.name}>
            <div>
            <div className={css.aligned}>
              <FieldTextInput
                type="text"
                id={formId ? `${formId}.fname` : 'fname'}
                name="fname"
                autoComplete="given-name"
                label={firstNameLabel}
                placeholder={firstNamePlaceholder}
                validate={firstNameRequired}
              />
               </div>
            <div className={css.aligned}>
              <FieldTextInput
                type="text"
                id={formId ? `${formId}.lname` : 'lname'}
                name="lname"
                autoComplete="family-name"
                label={lastNameLabel}
                placeholder={lastNamePlaceholder}
                validate={lastNameRequired}
              />
              </div>
              </div>

             <div className={css.password}>
              <FieldTextInput
                type="text"
                id={formId ? `${formId}.Phone` : 'phoneNumber'}
                name="phoneNumber"
                autoComplete="phone-name"
                label={PhoneLabel}
                placeholder={PhonePlaceholder}
                validate={PhoneRequired}
              />
            </div>
               <FieldTextInput
              className={css.password}
              type="password"
              id={formId ? `${formId}.password` : 'password'}
              name="password"
              autoComplete="new-password"
              label={passwordLabel}
              placeholder={passwordPlaceholder}
              validate={passwordValidators}
            />
            </div>
   </div>
) : ( <div> </div>);


const Title = (isBooking)  ?
(
<h2 className={css.heading}>
Demande de Réservation pour { listingTitle } <br/> le {moment(BookingValues.bookingStart).format('DD MMMM')} à { BookingInfo }
</h2>
) : (
<h2 className={css.heading}>
<FormattedMessage id="EnquiryForm.heading" values={{ listingTitle }} />
</h2>
);
      return (
        <Form className={classes} onSubmit={handleSubmit}>
          <IconEnquiry className={css.icon} />
          
            {Title}
          
          {inputtext}
          <FieldTextInput
            className={css.field}
            type="textarea"
            name="message"
            id={formId ? `${formId}.message` : 'message'}
            label={messageLabel}
            placeholder={messagePlaceholder}
            validate={messageRequired}
          />
          <div className={submitButtonWrapperClassName}>
            {sendEnquiryError ? (
              <p className={css.error}>
                <FormattedMessage id="EnquiryForm.sendEnquiryError" />
              </p>
            ) : null}
            <PrimaryButton type="submit" inProgress={submitInProgress} disabled={submitDisabled}>
              <FormattedMessage id="EnquiryForm.submitButtonText" />
            </PrimaryButton>
          </div>
        </Form>
      );
    }}
  />
);

EnquiryFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  inProgress: false,
  sendEnquiryError: null,
};

EnquiryFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  inProgress: bool,

  listingTitle: string.isRequired,
  authorDisplayName: string.isRequired,
  sendEnquiryError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,
};

const EnquiryForm = compose(injectIntl)(EnquiryFormComponent);

EnquiryForm.displayName = 'EnquiryForm';

export default EnquiryForm;
