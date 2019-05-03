import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import { fakeIntl } from '../../util/test-data';
import EditListingSessionForm from './EditListingSessionForm';

const noop = () => null;

describe('EditListingSessionForm', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(
      <EditListingSessionForm
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={v => v}
        saveActionMsg="Save Session"
        updated={false}
        updateInProgress={false}
        categories={[{ key: 'cat1', label: 'Cat 1' }, { key: 'cat2', label: 'Cat 2' }]}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
