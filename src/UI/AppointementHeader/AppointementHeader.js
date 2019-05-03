import React from 'react';
import PropTypes from 'prop-types';
import css from './AppointementHeader.css';
import moment from 'moment';
import 'moment/locale/fr'; // without this line it didn't work
moment.locale('fr');

function AppointementHeader(props) {
  const { slotDate:{start} } = props;
  return (
    <div className={css.listHeader}>
      <span className={css.dayHeading}>{moment(start).format('dddd')}</span>
      <p className={css.dayHeading}>{moment(start).format('DD MMMM')} </p>
    </div>
  );
}

const { object } = PropTypes;

AppointementHeader.propTypes = {
  slotDate: object.isRequired,
};
//AppointementHeader.defaultProps = { children: null };

export default AppointementHeader;
