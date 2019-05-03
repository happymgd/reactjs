import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import config from '../../config';
import { propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { Button, Form, FieldCurrencyInput, FieldCheckbox } from '../../components';

import css from './EditListingPricingForm.css';

const { Money } = sdkTypes;

export const EditListingPricingFormComponent = props => (
  <FinalForm
    {...props}
    render={fieldRenderProps => {
      let {
        className,
        disabled,
        handleSubmit,
        intl,
        invalid,
        pristine,
        checkboxHandler,
        saveActionMsg,
        updated,
        updateError,
        updateInProgress,
      } = fieldRenderProps;

      const pricePerUnitMessage = intl.formatMessage({
        id: 'EditListingPricingForm.pricePerUnit',
      });
      const pricePlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder',
      });

      const priceRequired = validators.required(
        intl.formatMessage({
          id: 'EditListingPricingForm.priceRequired',
        })
      );
      const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);
      const minPriceRequired = validators.moneySubUnitAmountAtLeast(
        intl.formatMessage(
          {
            id: 'EditListingPricingForm.priceTooLow',
          },
          {
            minPrice: formatMoney(intl, minPrice),
          }
        ),
        config.listingMinimumPriceSubUnits
      );
      const priceValidators = config.listingMinimumPriceSubUnits
        ? validators.composeValidators(priceRequired, minPriceRequired)
        : priceRequired;

      const classes = classNames(css.root, className);
      const submitReady = updated && pristine;
      const submitInProgress = updateInProgress;
      //const submitDisabled = invalid || disabled || submitInProgress;
      var checkEle = document.getElementById('confirm_check');
 
      const handleCheck = (e) => {

        checkboxHandler = checkEle.checked;

        document.getElementById('confirm_btn').disabled = invalid || disabled || submitInProgress || !checkEle.checked;
      };


 
      return (
        <Form onSubmit={handleSubmit} className={classes}>
          {updateError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.updateFailed" />
            </p>
          ) : null}
          <FieldCurrencyInput
            id="price"
            name="price"
            className={css.priceInput}
            autoFocus
            label={pricePerUnitMessage}
            placeholder={pricePlaceholderMessage}
            currencyConfig={config.currencyConfig}
            validate={priceValidators}
          />
<br/>
          <FieldCheckbox
              id="confirm_check"
              name="confirm_check"
              label="J’accepte de reverser l’intégralité de la première consultation à Guerizen. Guerizen ne prendra aucune commission sur tous les rendez-vous suivants"
              onChange={values => {
                handleCheck(values);
              }}
              checked={checkboxHandler}
          >
          </FieldCheckbox>

          <Button
            id="confirm_btn"
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled="disabled"
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingPricingFormComponent.defaultProps = { updateError: null };

const { bool, func, string } = PropTypes;

EditListingPricingFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
};

export default compose(injectIntl)(EditListingPricingFormComponent);
