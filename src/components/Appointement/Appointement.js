import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propTypes } from '../../util/types';
import { chunkData } from '../../util/array';
import css from './Appointement.css';
import { AppointementHeader, AppointementNav, AppointementRows } from '../../UI';

class Appointement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginateIndex: 0,
    };
  }
 
  paginate = index => {
    this.setState({ paginateIndex: index });
  };
  render() {
    const { slots, chunkSize } = this.props;
    //console.log(slots);
    const { paginateIndex } = this.state;
    const chunkedSlots = chunkData(slots, chunkSize);

    // const dayTimeSlot = [...new Array(dayTimeSlotsSize)].map( (item, index)=>);
    if (chunkedSlots.length < 1) {
      return null;
    }
  
    return (
      <div>
        <AppointementNav paginateIndex={paginateIndex} onPageNavigate={this.paginate} />
        <ul className={css.listWrap}>
          {chunkedSlots[paginateIndex].map(slotItem => {
            //console.log(slotItem);
            return (
              <li key={slotItem.id.uuid} className={css.listHeader}>
                <AppointementHeader slotDate={slotItem.attributes} />
                <AppointementRows
                  entries={slotItem.entries}
                  onResults={this.props.onResults}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const { arrayOf, number, func } = PropTypes;
Appointement.defaultProps = {
  slots: [],
  chunkSize: 4,
  dayTimeSlotsSize: 4,
  duration: 1,
  interval: 15,
};
Appointement.propTypes = {
  slots: arrayOf(propTypes.timeSlot),
  chunkSize: number,
  dayTimeSlotsSize: number,
  duration: number,
  interval: number,
  onResults: func.isRequired,
};
export default Appointement;
