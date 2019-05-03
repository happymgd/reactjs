import React, { Component } from 'react';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  DndSchedule,
  UserNav,
  ScheduleAside,
} from '../../components';
import { intlShape, injectIntl } from 'react-intl';
import css from './SchedulePage.css';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  closeListing,
  openListing,
  getOwnListingsById,
  queryOwnListings,
} from '../ManageListingsPage/ManageListingsPage.duck';
import { parse } from '../../util/urlHelpers';
import PropTypes from 'prop-types';
import { propTypes } from '../../util/types';
//import { makeViewPlanning, makeSchedulePayload, makeEventViewList, getFormatedAvailability } from './ScheduleUtil';
import { makeViewPlanning, makeEventViewList, getFormatedAvailability } from './ScheduleUtil';
import { safeGet, isEmptyObj } from '../../util/array';
import moment from 'moment';

import {
  requestUpdateListingSchedule,
} from '../EditListingPage/EditListingPage.duck';

const RESULT_PAGE_SIZE = 42;
//Front end demo to be deleted
function updateView(list, update) {
  if (isEmptyObj(list)) {
    return list;
  }
  return list.reduce((acc, curr) => {
    if (
      curr.uuid === safeGet(update, 'event', 'uuid') &&
      curr.index === safeGet(update, 'event', 'index')
    ) {
      return [...acc, ...[{ ...curr, start: update.start, end: update.end }]];
    }
    return [...acc, ...[curr]];
  }, []);
}
/* end: Mon Mar 11 2019 12:00:00 GMT+0100 (heure normale d’Europe centrale) {}
id: "5c0fe194-d9cf-42a0-b8a0-003186e5428c"
index: 0
resource: {dayOfWeek: "mon", seats: 1, startTime: "08:00", endTime: "12:00", resourceId: "5c0fe194-d9cf-42a0-b8a0-003186e5428c", …}
resourceId: "5c0fe194-d9cf-42a0-b8a0-003186e5428c"
start: Mon Mar 11 2019 08:00:00 GMT+0100 (heure normale d’Europe centrale) {}
title: "Hypnose à Helleville"
uuid: "5c0fe194-d9cf-42a0-b8a0-003186e5428c"
 */

const MOCK_AVAILABITY = {
  data: [
    {
      id: '5c0fe194-d9cf-42a0-b8a0-003186e5428c',
      uuid: '5c0fe194-d9cf-42a0-b8a0-003186e5428c',
      type: 'availabilityException',
      attributes: {
        title: 'fake 1',
        seats: 1, //1=="creneau expectionnel", 0==""
        start: `${moment()
          .startOf('week')
          .add('day', 1)
          .add('hour', 9)
          .toDate()}`,
        end: `${moment()
          .startOf('week')
          .add('day', 1)
          .add('hour', 10)
          .toDate()}`,
        eventClasses: 'item',
      },
    },
    {
      id: '5c0fd7db-85b1-4ea8-b434-b4ac6784f316',
      uuid: '5c0fd7db-85b1-4ea8-b434-b4ac6784f316',

      type: 'availabilityException',
      attributes: {
        title: 'fake 1',
        seats: 0, //1=="creneau expectionnel", 0==""
        start: `${moment()
          .startOf('week')
          .add('hour', 9)
          .toDate()}`,
        end: `${moment()
          .startOf('week')
          .add('hour', 10)
          .toDate()}`,
        eventClasses: 'item',
      },
    },
    {
      id: '34cf5423-04ee-42c7-8786-2e206ef34a9g',
      uuid: '34cf5423-04ee-42c7-8786-2e206ef34a9g',

      type: 'availabilityException',
      attributes: {
        title: 'fake 3',
        seats: 1, //1=="creneau expectionnel", 0==""
        start: `${moment()
          .startOf('week')
          .add('day', 1)
          .add('hour', 9)
          .add('minute')
          .toDate()}`,
        end: `${moment()
          .startOf('week')
          .add('day', 1)
          .add('hour', 11)
          .toDate()}`,
        eventClasses: 'item',
      },
    },
  ],
};

class SchedulePageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekOffset: 0,
      filter: [],
      appliedFitler: false,
      update: {},
      isEditingSlot: true,
    };
  }
  handleOnChange = type => {
    //const payload = makeSchedulePayload(this.props.listings, type);
    //frontend demo .to be deleted
    this.setState({ update: type });
    //console.log(type);

  };

  handleUpdateListingSchedule = options => {
   
    if (!!options) {
      const id = options.id;
      let values = [];
      options.availabilityPlan.forEach(option => option.selected ? values=values.concat([{ 
        dayOfWeek: option.dayOfWeek,
        seats: 1,
        startTime: option.startTime,
        endTime: option.endTime
      }]) : false);

      const availabilityPlan = {
        type: "availability-plan/time",
        timezone: "Europe/Paris",
        entries: values
      };
/*
      const availabilityException =
        {
          type: 'availabilityException',
          entries: [{
            title: 'fake 1',
            seats: 1, //1=="creneau expectionnel", 0==""
            start: `${moment()
              .startOf('week')
              .add('day', 1)
              .add('hour', 9)
              .toDate()}`,
            end: `${moment()
              .startOf('week')
              .add('day', 1)
              .add('hour', 10)
              .toDate()}`,
            eventClasses: 'item',
          },]
        };*/
      const updateValues = {
        id : id,
        availabilityPlan: availabilityPlan ,
        //privateData: {availabilityException},
        
      };

    //console.log(updateValues);
      
        this.props.updateListingSchedule(updateValues)
        .catch((err) => {
        
         
       });
     
      
  }
  
  

  };

  
  onDateNav = offsetWeekPosition => this.setState({ weekOffset: offsetWeekPosition });
  onChange = chng => {
    
     if (!!chng) {
      const {
        values: { listing },
      } = chng;
      
      if (listing) {
        this.setState({ filter: listing, appliedFitler: true });
      }
    } 
  };


  onCheckAll=()=>{
   // console.log('checl amm')
    this.setState( { appliedFitler: false  })
  }
 renderList = (isAvailabity, props, state) => {

    

    const { listings } = props;
    console.log(listings);
/*<<<<<<< HEAD
    const listingsOpened = listings.map(listing => chooselisting(listing));
    //console.log(listingsOpened);
    const { weekOffset, filter, touched } = state;
    if (isAvailabity) {
      return makeViewPlanning(listingsOpened, weekOffset, filter, touched);
=======
    const { weekOffset, filter, appliedFitler } = state;
    if (isAvailabity) {
      return makeViewPlanning(listings, weekOffset, filter, appliedFitler);
>>>>>>> 6e935a8c26a34035aa5ce711562aab3bae1019d2
*/

let listingsOpened = [];
listings.forEach(listing => {
  if (listing.attributes.state!=="closed")
  listingsOpened.push(listing);
  
});
    //console.log(listingsOpened);
    const { weekOffset, filter, appliedFitler } = state;
    if (isAvailabity) {
     /* console.log(filter);
    console.log(appliedFitler);
    console.log(listingsOpened);*/
      return makeViewPlanning(listingsOpened, weekOffset, filter, appliedFitler);
      
    }
    const  slots = getFormatedAvailability(listingsOpened, weekOffset);
   // console.log(filter);
    //console.log(appliedFitler);
    if (!appliedFitler)
    {
      //appliedFitler = true;
      let list= listingsOpened.reduce(
      (acc, curr) => [
        ...acc,
        ...[{ uuid: curr.id.uuid, selected: false, attributes: curr.attributes }],
      ],[]
    );
    list[0].selected = true;
    this.onChange({values: list});
//console.log(list);
    
    return { ...makeEventViewList(MOCK_AVAILABITY.data,listingsOpened, list, true), slots }
    }
    else{
    
      let list = filter
      let find = false
     
      list.forEach(element => element.selected && !find ? 
        find =true : element.selected = false)
        if(!find)
        {
          list[0].selected = true;
        }

    this.onChange({values: list});
    return { ...makeEventViewList(MOCK_AVAILABITY.data,listingsOpened, filter, appliedFitler), slots };
  }
  };

  handleOnEditChange = _ =>
    this.setState(prevState => ({ isEditingSlot: !prevState.isEditingSlot }));

  render() {
    const { isEditingSlot } = this.state;
    const { view, options, slots } = this.renderList(isEditingSlot, this.props, this.state);
    //    //frontend demo .to be deleted
    const useView = updateView(view, this.state.update);
    return (
      <StaticPage
        className={css.root}
        title="Schedule"
        schema={{
          '@context': 'http://schema.org',
          '@type': 'SchedulePage',
          description: 'Description of this page',
          name: 'Schedule page',
        }}
      >
        <LayoutSingleColumn className={css.pageRoot}>
          <LayoutWrapperTopbar>
            <TopbarContainer />
            <UserNav selectedPageName="SchedulePage" />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <section className={css.contentWrap}>
              <DndSchedule
                className={css.contentMain}
                // viewSlots={formated}
                viewList={useView} //replace the useview by view  when backend ready
                onChange={this.handleOnChange}
                onDateNav={this.onDateNav}
                updateListingSchedule={this.handleUpdateListingSchedule}
                isEditingSlot={isEditingSlot}
                slots={!!slots?slots:[]}//slots should'nt be necessary.
              />
              <ScheduleAside
                className={css.contentAside}
                options={options}
                onChange={this.onChange}
                isEditingSlot={isEditingSlot}
                onEditChange={this.handleOnEditChange}
                onCheckAll={this.onCheckAll}
              />
            </section>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </StaticPage>
    );
  }
}

SchedulePageComponent.defaultProps = {
  listings: [],
  pagination: null,
  queryListingsError: null,
  queryParams: null,
  closingListing: null,
  closingListingError: null,
  openingListing: null,
  openingListingError: null,
};

const { arrayOf, bool, func, object, shape, string, array } = PropTypes;

SchedulePageComponent.propTypes = {
  closingListing: shape({ uuid: string.isRequired }),
  closingListingError: shape({
    listingId: propTypes.uuid.isRequired,
    error: propTypes.error.isRequired,
  }),
  listings: arrayOf(propTypes.ownListing),
  onCloseListing: func.isRequired,
  onOpenListing: func.isRequired,
  openingListing: shape({ uuid: string.isRequired }),
  openingListingError: shape({
    listingId: propTypes.uuid.isRequired,
    error: propTypes.error.isRequired,
  }),
  pagination: propTypes.pagination,
  queryInProgress: bool.isRequired,
  queryListingsError: propTypes.error,
  queryParams: object,
  scrollingDisabled: bool.isRequired,
  updateListingSchedule: func.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
  timeSlots: array,
};

const mapStateToProps = state => {
  const {
    currentPageResultIds,
    pagination,
    queryInProgress,
    queryListingsError,
    queryParams,
    openingListing,
    openingListingError,
    closingListing,
    closingListingError,
  } = state.ManageListingsPage;
  const listings = getOwnListingsById(state, currentPageResultIds);
  return {
    currentPageResultIds,
    listings,
    pagination,
    queryInProgress,
    queryListingsError,
    queryParams,
    scrollingDisabled: isScrollingDisabled(state),
    openingListing,
    openingListingError,
    closingListing,
    closingListingError,
  };
};

const mapDispatchToProps = dispatch => ({
  onCloseListing: listingId => dispatch(closeListing(listingId)),
  onOpenListing: listingId => dispatch(openListing(listingId)),
  updateListingSchedule: values => dispatch(requestUpdateListingSchedule(values)),
});

const SchedulePage = compose(withRouter, connect(mapStateToProps, mapDispatchToProps), injectIntl)(
  SchedulePageComponent
);

SchedulePage.loadData = (params, search) => {
  //  console.log( params, search)
  const queryParams = parse(search);
  const page = queryParams.page || 1;
  return queryOwnListings({
    ...queryParams,
    page,
    perPage: RESULT_PAGE_SIZE,
  });
};

export default SchedulePage;
