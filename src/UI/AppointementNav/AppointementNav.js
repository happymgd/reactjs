import React from 'react';
import PropTypes from 'prop-types';
import css from './AppointementNav.css';
import { InlineTextButton } from '../../components';

function AppointementNav(props) {
  const { paginateIndex, onPageNavigate } = props;
    return (
       <div className={css.listActions}>
          <InlineTextButton
            disabled={ paginateIndex === 0}
            onClick={e =>onPageNavigate(paginateIndex - 1)}
          >
            &#60;
          </InlineTextButton>
          <InlineTextButton onClick={_ => onPageNavigate( paginateIndex + 1)}>
            >
          </InlineTextButton>
        </div>
    )
}
const { func, number } = PropTypes;

AppointementNav.propTypes = {
  paginateIndex: number.isRequired,
  onPageNavigate:func
};
//AppointementHeader.defaultProps = { children: null };

export default AppointementNav;
