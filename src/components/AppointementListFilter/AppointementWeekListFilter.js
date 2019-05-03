import React, { Fragment } from 'react';
import { Form, FormSpy} from 'react-final-form';
// import { Form, FormSpy, Field } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';

import arrayMutators from 'final-form-arrays';
import PropTypes from 'prop-types';
import css from './AppointementListFilter.css';


import {  PrimaryButton } from '../../components';
//checimport {  SecondaryButton } from '../Button/Button';

const CheckboxGroup = ({ fields, options }) => {
  const toggle = (event, option) => {
    const updatedVal = options.availabilityPlan.reduce((acc, curr) => {
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

  const toggle_start = (event, option) => {
    const updatedVal = options.availabilityPlan.reduce((acc, curr) => {
      if (curr.uuid === option.uuid) {
        return [...acc, ...[{ ...curr, startTime: event.target.value }]];
      }
      return [...acc, ...[curr]];
    }, []);
    if (fields.length === undefined) {
      updatedVal.map((option, idx) => fields.push(option));
      return;
    }
    fields.change(updatedVal);
    //console.log(updatedVal);
  };
  const toggle_end = (event, option) => {
    const updatedVal = options.availabilityPlan.reduce((acc, curr) => {
      if (curr.uuid === option.uuid) {
        return [...acc, ...[{ ...curr, endTime: event.target.value }]];
      }
      return [...acc, ...[curr]];
    }, []);
    if (fields.length === undefined) {
      updatedVal.map((option, idx) => fields.push(option));
      return;
    }
    fields.change(updatedVal);
    //console.log(updatedVal);
  };
   
  //console.log(options);
      
  return (
    <Fragment>
      {options.availabilityPlan.map(option => (
        

        <div key={option.uuid} className={css.row}>
          <input
            type="checkbox"
            readOnly
            className={css.checkbox__input}
            onClick={event => toggle(event, option)}
            checked={option.selected}
          />
          <div className={css.content}>
            <span className={css.label}>&nbsp; &nbsp;{option.label} </span>
              </div>
          
              <div className={css.content} style={option.selected ? {} : {display : 'none'}}>
              <span className={css.label}>&nbsp; &nbsp;&nbsp; &nbsp;début : </span>

          </div>
              <div className={css.content} style={option.selected ? {} : {display : 'none'}}>
               <input
            type="text"
            name="startTime"
            onBlur={event => toggle_start(event, option)}
            defaultValue={option.startTime} 
          />
          </div>
          <div className={css.content} style={option.selected ? {} : {display : 'none'}}>
              <span className={css.label}>&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;fin : </span>

          </div>
              <div className={css.content} style={option.selected ? {} : {display : 'none'}}>
           <input
            type="text"
            name="endTime"
            onBlur={event => toggle_end(event, option)}
            defaultValue={option.endTime} 
          />
              </div>
        </div>
      ))}
    </Fragment>
  );
};

const { object, string, func } = PropTypes;

AppointementWeekListFilter.defaultProps = {
  options: {id: 0,
  availabilityPlan: [],
},
  title: '',
};
AppointementWeekListFilter.propTypes = {
  options: object,
  title: string,
  onChange: func,
  onSubmit: func,
};


 //prevent error
export function AppointementWeekListFilter(props) {
  //const { options, onChange, checkAll } = props;
  const { options,datum,title, onChange,onSubmit } = props;

 
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators,
        }}
        render={({ handleSubmit }) => (
          <form >
          <h2>{title} de {datum.title}</h2>
          <div>
            <label></label>
          </div>

          <div>
           <FormSpy onChange={onChange} />
            <FieldArray name="listing" component={CheckboxGroup} options={options} />
            </div>

<div>
 <br/><br/>
</div>

<a onClick={e=>onSubmit(options)}> test</a>


<PrimaryButton
              className={css.submitButton}
              type="submit"
              
            >
            Valider
            
 </PrimaryButton>
</form>
        )}
      />
    </div>
  );
}
