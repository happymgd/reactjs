import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { propTypes } from '../../util/types';
import css from './ScheduleAside.css';
import { AppointementListFilter } from './../AppointementListFilter/AppointementListFilter';
import { SecondaryButton } from '../Button/Button';
class ScheduleAside extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { options, onChange, isEditingSlot, onCheckAll, onEditChange } = this.props;
    return (
      <div className={css.sideWrap}>
        <SecondaryButton onClick={onEditChange}>
          {isEditingSlot ? 'modifier les rendez-vous' : " modifier les créneaux d'ouvertures "}
        </SecondaryButton>
        <AppointementListFilter options={options} onChange={onChange} checkAll={onCheckAll} />
        {isEditingSlot ? <SecondaryButton onClick={onCheckAll}>See all</SecondaryButton> : null}
      </div>
    );
  }
}

const { array, func, bool } = PropTypes;
ScheduleAside.defaultProps = { options: [] };
ScheduleAside.propTypes = {
  options: array,
  onChange: func,
  isEditingSlot: bool.isRequired,
  onEditChange: func,
  onCheckAll: func,
};
export default ScheduleAside;
