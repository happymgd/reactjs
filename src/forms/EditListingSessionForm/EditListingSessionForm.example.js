/* eslint-disable no-console */
import EditListingSessionForm from './EditListingSessionForm';

export const Empty = {
  component: EditListingSessionForm,
  props: {
    onSubmit: values => {
      console.log('Submit EditListingSessionForm with (unformatted) values:', values);
    },
    saveActionMsg: 'Save session',
    updated: false,
    updateInProgress: false,
  },
  group: 'forms',
};
