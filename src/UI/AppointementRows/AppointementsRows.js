//import React from 'react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './AppointementRows.css';
import moment from 'moment';
import 'moment/locale/fr'; // without this line it didn't work
import { SecondaryButton } from '../../components';
moment.locale('fr');



class AppointementRows extends Component {
  constructor(props) {
    super(props);
    this.getResults=this.getResults.bind(this);
  }
 

  getResults(values) {
    this.props.onResults(values);
  }
  
  render() {
  const { entries } = this.props;
  

  return entries.map((entry, idx) => {
    return (
      <div className={css.cell} key={`cell_appo_${idx}`}>
      {
        entry.seats===1 ? <SecondaryButton onClick={() => this.getResults(entry)}>{entry.time}</SecondaryButton>:<span>not available</span>
      }
      </div>
    );
  });
}
}
const { array, func } = PropTypes;

AppointementRows.propTypes = {
  entries: array.isRequired,
  onResults: func.isRequired,
};
//AppointementHeader.defaultProps = { children: null };

export default AppointementRows;
