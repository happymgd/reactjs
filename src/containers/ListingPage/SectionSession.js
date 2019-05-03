import React from 'react';
import { FormattedMessage } from 'react-intl';
import { shape, string } from 'prop-types';

import css from './ListingPage.css';

const SectionSession = props => {
  const { publicData } = props;
  const  session  = publicData.session;
    return (
    <div className={css.sectionDescription}>
      <h2 className={css.descriptionTitle}>
        <FormattedMessage id="ListingPage.sessionTitle" />
      </h2>
        <p className={css.description}>{session}</p>
    </div>
  );
};

SectionSession.propTypes = {
  publicData: shape({
    session: string,
  }).isRequired,
};
export default SectionSession;
