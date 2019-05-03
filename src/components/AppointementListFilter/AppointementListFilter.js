import React, { Fragment } from 'react';
import { Form, FormSpy } from 'react-final-form';
// import { Form, FormSpy, Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import arrayMutators from 'final-form-arrays';
import PropTypes from 'prop-types';
import css from './AppointementListFilter.css';
//checimport {  SecondaryButton } from '../Button/Button';

const CheckboxGroup = ({ fields, options }) => {
  const toggle = (event, option) => {
    const updatedVal = options.reduce((acc, curr) => {
      if (curr.uuid === option.uuid) {
        return [...acc, ...[{ ...curr, selected: !curr.selected }]];
      }
      return [...acc, ...[curr]];
    }, []);
    if (fields.length === undefined) {
      updatedVal.map((option, idx) => fields.push(option));
      return;
    }
    fields.change(updatedVal);
  };
  return (
    <Fragment>
      {options.map(option => (
        <div key={option.uuid} className={css.row}>
          <input
            type="checkbox"
            readOnly
            className={css.checkbox__input}
            onClick={event => toggle(event, option)}
            checked={option.selected}
          />
          <div className={css.content}>
            <span className={css.label}>{option.attributes.title} </span>
            <div className={[css.color]} />
          </div>
        </div>
      ))}
    </Fragment>
  );
};

const { array, string, func } = PropTypes;

AppointementListFilter.defaultProps = {
  options: [],
  title: '',
};
AppointementListFilter.propTypes = {
  options: array,
  title: string,
  onChange: func,
  checkAll: func,
};
const onSubmit = e => e; //prevent error
export function AppointementListFilter(props) {
  //const { options, onChange, checkAll } = props;
  const { options, onChange } = props;
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators,
        }}
        render={({ handleSubmit }) => (
          <form>
            <FormSpy onChange={onChange} />
            <FieldArray name="listing" component={CheckboxGroup} options={options} />
          </form>
        )}
      />
    </div>
  );
}
