/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import { array, arrayOf, bool, func, shape, string, oneOf } from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import config from '../../config';
import routeConfiguration from '../../routeConfiguration';
import { LISTING_STATE_PENDING_APPROVAL, LISTING_STATE_CLOSED, propTypes } from '../../util/types';
import { types as sdkTypes } from '../../util/sdkLoader';
import { LISTING_PAGE_PENDING_APPROVAL_VARIANT, createSlug, parse } from '../../util/urlHelpers';
import { formatMoney } from '../../util/currency';
import { createResourceLocatorString, findRouteByRouteName } from '../../util/routes';
import { ensureListing, ensureOwnListing, ensureUser, userDisplayName } from '../../util/data';
import { richText } from '../../util/richText';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { requestCreateAvailabilityException } from '../EditListingPage/EditListingPage.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import { signup } from '../../ducks/Auth.duck';
import {
  Page,
  NamedLink,
  NamedRedirect,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { TopbarContainer, NotFoundPage } from '../../containers';

import { sendEnquiry, loadData, setInitialValues } from './ListingPage.duck';
import SectionImages from './SectionImages';
import SectionAvatar from './SectionAvatar';
import SectionHeading from './SectionHeading';
import SectionDescription from './SectionDescription';
import SectionFeatures from './SectionFeatures';
import SectionSession from './SectionSession';
import SectionReviews from './SectionReviews';
import SectionHost from './SectionHost';
import SectionRulesMaybe from './SectionRulesMaybe';
import SectionMapMaybe from './SectionMapMaybe';
import SectionBooking from './SectionBooking';

import moment from 'moment';

import { pathByRouteName } from '../../util/routes';
import { clearData } from '../../containers/CheckoutPage/CheckoutPageSessionHelpers';

import { initiateOrder } from '../../containers/CheckoutPage/CheckoutPage.duck';



import css from './ListingPage.css';


const STORAGE_KEY = 'ListingPage';



const MIN_LENGTH_FOR_LONG_WORDS_IN_TITLE = 16;

const { UUID } = sdkTypes;

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: `(${price.currency})`,
      priceTitle: `Unsupported currency (${price.currency})`,
    };
  }
  return {};
};

const openBookModal = (history, listing) => {
  if (!listing.id) {
    // Listing not fully loaded yet
    return;
  }
  const routes = routeConfiguration();
  history.push(
    createResourceLocatorString(
      'ListingPage',
      routes,
      { id: listing.id.uuid, slug: createSlug(listing.attributes.title) },
      { book: true }
    )
  );
};

const closeBookModal = (history, listing) => {
  if (!listing.id) {
    // Listing not fully loaded yet
    return;
  }
  const routes = routeConfiguration();
  history.push(
    createResourceLocatorString(
      'ListingPage',
      routes,
      { id: listing.id.uuid, slug: createSlug(listing.attributes.title) },
      {}
    )
  );
};

const categoryLabel = (categories, key) => {
  const cat = categories.find(c => c.key === key);
  return cat ? cat.label : key;
};

export class ListingPageComponent extends Component {
  constructor(props) {
    super(props);
    const { enquiryModalOpenForListingId, params } = props;
    this.state = {
      pageClassNames: [],
      imageCarouselOpen: false,
      isBooking: false,
      BookingInfo: null,
      BookingValues: null,
      enquiryModalOpen: enquiryModalOpenForListingId === params.id,
      NCenquiryModalOpen: enquiryModalOpenForListingId === params.id,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onContactUser = this.onContactUser.bind(this);
    this.onBooking = this.onBooking.bind(this);
    this.onSubmitEnquiry = this.onSubmitEnquiry.bind(this);
  }

  /*handleSubmit(values) {
    const { history, getListing, params, useInitialValues } = this.props;
    const listingId = new UUID(params.id);
    const listing = getListing(listingId);


    const { bookingDates, ...bookingData } = values;

    const initialValues = {
      listing,
      bookingData,
      bookingDates: {
        bookingStart: bookingDates.startDate,
        bookingEnd: bookingDates.endDate,
      },
    };

    const routes = routeConfiguration();
    // Customize checkout page state with current listing and selected bookingDates
    const { setInitialValues } = findRouteByRouteName('CheckoutPage', routes);
    useInitialValues(setInitialValues, initialValues);

    // Redirect to CheckoutPage
    history.push(
      createResourceLocatorString(
        'CheckoutPage',
        routes,
        { id: listing.id.uuid, slug: createSlug(listing.attributes.title) },
        {}
      )
    );
  }*/
 


   handleSubmit= (values)=> {
   
    const {  history, sendOrderRequest, submitSignup,  params } = this.props;
    

    
    const listingId = new UUID(params.id);

    const { currentUser } = this.props;

   /*
if (!currentUser) {
   const { history, location } = this.props;  
     const state = { from: `${location.pathname}${location.search}${location.hash}` };
console.log(state);
      // We need to log in before showing the modal, but first we need to ensure
      // that modal does open when user is redirected back to this listingpage
     // signup and return back to listingPage.
      history.push(createResourceLocatorString('SignupPage', routeConfiguration(), {}, {}), state);
    }
    */

    this.setState({ submitting: true });

    const cardToken = "tok_mastercard";
    //console.log(values);
    //const { bookingDates } = values;

   
    // Create order aka transaction
    // NOTE: if unit type is line-item/units, quantity needs to be added.
    // The way to pass it to checkout page is through pageData.bookingData
/*    let dateStr = '2019-03-11',
    timeStr = '09:00',
    Start    = moment(dateStr),
    time    = moment(timeStr, 'HH:mm');

    Start.set({
    hour:   time.get('hour'),
    minute: time.get('minute'),
    second: time.get('second')
});

let dateStr2 = '2019-03-11',
timeStr2 = '10:00',
End     = moment(dateStr2),
time2    = moment(timeStr2, 'HH:mm');

End.set({
hour:   time2.get('hour'),
minute: time2.get('minute'),
second: time2.get('second')
});
*/

//console.log(values);
    const requestParams = {
      listingId: listingId,
      cardToken,
      bookingStart: moment(this.state.BookingValues.bookingStart).toDate(),
      bookingEnd: moment(this.state.BookingValues.bookingEnd).toDate(),
      quantity: 1,
    };
//console.log(requestParams);

/*
const reqparams = { listingId: listingId, 
  start: moment(values.bookingStart).toDate(), 
  end: moment(values.bookingEnd).toDate(), 
  seats: 0,
 };
console.log(reqparams)
/*
onCreateAvailabilityException(reqparams).then(values => {
  this.setState({ submitting: false });
});;
*/


if (!currentUser)
  {
    const { message, fname, lname, email, password, phoneNumber} = values;
    //const phone = values["Phone number"]
    const initialMessage = message;
    

    const param = { firstName: fname.trim(), lastName: lname.trim(), email: email.trim(), password: password.trim(),phoneNumber: phoneNumber}
    
    submitSignup(param)
    .then(
      results => sendOrderRequest(requestParams, initialMessage))
      .then(values => {
        const { orderId, initialMessageSuccess } = values;
        this.setState({ submitting: false });
        const routes = routeConfiguration();
        const OrderPage = findRouteByRouteName('OrderDetailsPage', routes);

        // Transaction is already created, but if the initial message
        // sending failed, we tell it to the OrderDetailsPage.
        
          OrderPage.setInitialValues({
            initialMessageFailedToTransaction: initialMessageSuccess ? null : orderId,
          })
       
        const orderDetailsPath = pathByRouteName('OrderDetailsPage', routes, {
          id: orderId.uuid,
        });
        clearData(STORAGE_KEY);
        history.push(orderDetailsPath);
      })
      .catch((e) => {
        console.log(e);
        this.setState({ submitting: false });
        
      });
    }
  else
    {


      const initialMessage = values.message;
    sendOrderRequest(requestParams, initialMessage)
      .then(values => {
        const { orderId, initialMessageSuccess } = values;
        this.setState({ submitting: false });
        const routes = routeConfiguration();
        const OrderPage = findRouteByRouteName('OrderDetailsPage', routes);

        // Transaction is already created, but if the initial message
        // sending failed, we tell it to the OrderDetailsPage.
        
          OrderPage.setInitialValues({
            initialMessageFailedToTransaction: initialMessageSuccess ? null : orderId,
          })
       
        const orderDetailsPath = pathByRouteName('OrderDetailsPage', routes, {
          id: orderId.uuid,
        });
        clearData(STORAGE_KEY);
        history.push(orderDetailsPath);
      })
      .catch((e) => {
        console.log(e);
        this.setState({ submitting: false });
        
      });
     
      }

      }




  onContactUser() {
  //  const { currentUser, history, useInitialValues, params, location } = this.props;
const { currentUser } = this.props;

    if (!currentUser) {
      // const state = { from: `${location.pathname}${location.search}${location.hash}` };

      // We need to log in before showing the modal, but first we need to ensure
      // that modal does open when user is redirected back to this listingpage
      // useInitialValues(setInitialValues, { enquiryModalOpenForListingId: params.id });
      this.setState({ enquiryModalOpen: true });
      // signup and return back to listingPage.
      //history.push(createResourceLocatorString('SignupPage', routeConfiguration(), {}, {}), state);
    } else {
      this.setState({ enquiryModalOpen: true });
    }
  }

  onBooking(values) {
    //  const { currentUser, history, useInitialValues, params, location } = this.props;
  const { currentUser } = this.props;
  
      if (!currentUser) {
        // const state = { from: `${location.pathname}${location.search}${location.hash}` };
  
        // We need to log in before showing the modal, but first we need to ensure
        // that modal does open when user is redirected back to this listingpage
        // useInitialValues(setInitialValues, { enquiryModalOpenForListingId: params.id });
        this.setState({ enquiryModalOpen: true });
        this.setState({ isBooking: true });
        this.setState({ BookingInfo: values.time });
        this.setState({ BookingValues: values });
        
        // signup and return back to listingPage.
        //history.push(createResourceLocatorString('SignupPage', routeConfiguration(), {}, {}), state);
      } else {
        this.setState({ enquiryModalOpen: true });
        this.setState({ isBooking: true });
        this.setState({ BookingInfo: values.time });
        this.setState({ BookingValues: values });
      }
    }


  onSubmitEnquiry(values) {
    const { history, getListing, intl, params, onSendEnquiry, submitSignup } = this.props;
    const routes = routeConfiguration();
    // const listingId = new UUID(params.id);
    const { currentUser } = this.props;

    const currentlistingId = new UUID(params.id);
    
    const listing = getListing(currentlistingId);
    const authorAvailable = listing && listing.author;
    const Author = authorAvailable ? listing.author : null;
    const ensuredAuthor = ensureUser(Author);

    const bannedUserDisplayName = intl.formatMessage({
      id: 'ListingPage.bannedUserDisplayName',
    });
    const authorDisplayName = userDisplayName(ensuredAuthor, bannedUserDisplayName);

   
    //  const messageBooking = this.state.isBooking ? 'Demande de Réservation pour '.concat(this.state.BookingInfo).concat('\n') : "";
    


      /*
  const currentEmail = currentUser.attributes.email || '';
  const protectedData = currentUser.attributes.profile.protectedData || {};
  
  const currentPhoneNumber = protectedData["Phone number"] || '';

*/
  /*
  const reqparams = { listingId: listingId, 
    start: moment(this.state.BookingValues.bookingStart).toDate(), 
    end: moment(this.state.BookingValues.bookingEnd).toDate(), 
    seats: 0,
   };
  console.log(reqparams)
  
  onCreateAvailabilityException(reqparams).then(values => {
    this.setState({ submitting: false });
  });

        onSendEnquiry(listingId, messageBooking.concat('pour ').concat(params.slug).concat(' de ').concat(authorDisplayName).concat('\n').concat('e-mail : ').concat(currentEmail).concat('\n').concat('numéro de téléphone : ').concat(currentPhoneNumber).concat('\n').concat(message.trim()))
      .then(
  */

if (this.state.isBooking )
  {
    this.handleSubmit(values);
  } 
else if (!currentUser)
  {

    const listingId = new UUID('5c3cd471-9030-4913-af1a-4d322efecbf3');
    const { message, fname, lname, email, password , phoneNumber } = values;
    
    //const phone = values["Phone number"]
   

    const param = { firstName: fname.trim(), lastName: lname.trim(), email: email.trim(), password: password.trim(),phoneNumber: phoneNumber}
    
    submitSignup(param)
    .then(
      results => onSendEnquiry(listingId, 'message pour '.concat(params.slug).concat(' de ').concat(authorDisplayName).concat('\n').concat(message.trim()))
      )
    .then(txId => {

 
        this.setState({ enquiryModalOpen: false });
    
        // Redirect to OrderDetailsPage
        history.push(
          createResourceLocatorString('OrderDetailsPage', routes, { id: txId.uuid }, {})
        );
      })
    .catch(() => {
        // Ignore, error handling in duck file
      });
    }
  else
    {
      const { message } = values;


      onSendEnquiry(currentlistingId, message.trim())
     .then(txId => {

 
        this.setState({ enquiryModalOpen: false });
    
        // Redirect to OrderDetailsPage
        history.push(
          createResourceLocatorString('OrderDetailsPage', routes, { id: txId.uuid }, {})
        );
      })
    .catch(() => {
        // Ignore, error handling in duck file
      });

    }
    
  }

  render() {
    const {
      unitType,
      //isAuthenticated,
      currentUser,
      getListing,
      getOwnListing,
      intl,
      onManageDisableScrolling,
      params: rawParams,
      location,
      scrollingDisabled,
      showListingError,
      history,
      reviews,
      fetchReviewsError,
      sendEnquiryInProgress,
      sendEnquiryError,
      timeSlots,
      fetchTimeSlotsError,
      categoriesConfig,
      amenitiesConfig,
    } = this.props;

    const isBook = !!parse(location.search).book;
    const listingId = new UUID(rawParams.id);
    const isPendingApprovalVariant = rawParams.variant === LISTING_PAGE_PENDING_APPROVAL_VARIANT;
    const currentListing = isPendingApprovalVariant
      ? ensureOwnListing(getOwnListing(listingId))
      : ensureListing(getListing(listingId));

    const listingSlug = rawParams.slug || createSlug(currentListing.attributes.title || '');
    const params = { slug: listingSlug, ...rawParams };

    const isApproved =
      currentListing.id && currentListing.attributes.state !== LISTING_STATE_PENDING_APPROVAL;

    const pendingIsApproved = isPendingApprovalVariant && isApproved;

    

    const duration_hours = currentListing.attributes.publicData.duration_hours;
    const duration_minutes = currentListing.attributes.publicData.duration_minutes;
    // If a /pending-approval URL is shared, the UI requires
    // authentication and attempts to fetch the listing from own
    // listings. This will fail with 403 Forbidden if the author is
    // another user. We use this information to try to fetch the
    // public listing.
    const pendingOtherUsersListing =
      isPendingApprovalVariant && showListingError && showListingError.status === 403;
    const shouldShowPublicListingPage = pendingIsApproved || pendingOtherUsersListing;

    if (shouldShowPublicListingPage) {
      return <NamedRedirect name="ListingPage" params={params} search={location.search} />;
    }

    const {
      description = '',
      geolocation = null,
      price = null,
      title = '',
      publicData,
    } = currentListing.attributes;

    const richTitle = (
      <span>
        {richText(title, {
          longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS_IN_TITLE,
          longWordClass: css.longWord,
        })}
      </span>
    );

    const topbar = <TopbarContainer />;

    if (showListingError && showListingError.status === 404) {
      // 404 listing not found

      return <NotFoundPage />;
    } else if (showListingError) {
      // Other error in fetching listing

      const errorTitle = intl.formatMessage({
        id: 'ListingPage.errorLoadingListingTitle',
      });

      return (
        <Page title={errorTitle} scrollingDisabled={scrollingDisabled}>
          <LayoutSingleColumn className={css.pageRoot}>
            <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
            <LayoutWrapperMain>
              <p className={css.errorText}>
                <FormattedMessage id="ListingPage.errorLoadingListingMessage" />
              </p>
            </LayoutWrapperMain>
            <LayoutWrapperFooter>
              <Footer />
            </LayoutWrapperFooter>
          </LayoutSingleColumn>
        </Page>
      );
    } else if (!currentListing.id) {
      // Still loading the listing

      const loadingTitle = intl.formatMessage({
        id: 'ListingPage.loadingListingTitle',
      });

      return (
        <Page title={loadingTitle} scrollingDisabled={scrollingDisabled}>
          <LayoutSingleColumn className={css.pageRoot}>
            <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
            <LayoutWrapperMain>
              <p className={css.loadingText}>
                <FormattedMessage id="ListingPage.loadingListingMessage" />
              </p>
            </LayoutWrapperMain>
            <LayoutWrapperFooter>
              <Footer />
            </LayoutWrapperFooter>
          </LayoutSingleColumn>
        </Page>
      );
    }

    const handleViewPhotosClick = e => {
      // Stop event from bubbling up to prevent image click handler
      // trying to open the carousel as well.
      e.stopPropagation();
      this.setState({
        imageCarouselOpen: true,
      });


    };

    const authorAvailable = currentListing && currentListing.author;
    const userAndListingAuthorAvailable = !!(currentUser && authorAvailable);
    const isOwnListing =
      userAndListingAuthorAvailable && currentListing.author.id.uuid === currentUser.id.uuid;
    const isClosed = currentListing.attributes.state === LISTING_STATE_CLOSED;
    const showContactUser = !currentUser || (currentUser && !isOwnListing);

    const currentAuthor = authorAvailable ? currentListing.author : null;
    const ensuredAuthor = ensureUser(currentAuthor);

    const bannedUserDisplayName = intl.formatMessage({
      id: 'ListingPage.bannedUserDisplayName',
    });
    const authorDisplayName = userDisplayName(ensuredAuthor, bannedUserDisplayName);

    const { formattedPrice, priceTitle } = priceData(price, intl);

    const handleMobileBookModalClose = () => {
      closeBookModal(history, currentListing);
    };

    const handleBookingSubmit = values => {
      const isCurrentlyClosed = currentListing.attributes.state === LISTING_STATE_CLOSED;
      if (isOwnListing || isCurrentlyClosed ) {
        window.scrollTo(0, 0);
        /*if (!!values.bookingStart) {
          this.handleSubmit(values);
        }*/
      } 
      else if (!!values.bookingStart) {
        this.onBooking(values);
        //this.handleSubmit(values);
      }

    };

    

    const handleBookButtonClick = () => {
      const isCurrentlyClosed = currentListing.attributes.state === LISTING_STATE_CLOSED;
      if (isOwnListing || isCurrentlyClosed) {
        window.scrollTo(0, 0);
      } else {
        openBookModal(history, currentListing);
      }
    };

    const listingImages = (listing, variantName) =>
      (listing.images || [])
        .map(image => {
          const variants = image.attributes.variants;
          const variant = variants ? variants[variantName] : null;

          // deprecated
          // for backwards combatility only
          const sizes = image.attributes.sizes;
          const size = sizes ? sizes.find(i => i.name === variantName) : null;

          return variant || size;
        })
        .filter(variant => variant != null);

    const facebookImages = listingImages(currentListing, 'facebook');
    const twitterImages = listingImages(currentListing, 'twitter');
    const schemaImages = JSON.stringify(facebookImages.map(img => img.url));
    const siteTitle = config.siteTitle;
    const schemaTitle = intl.formatMessage(
      { id: 'ListingPage.schemaTitle' },
      { title, price: formattedPrice, siteTitle }
    );

    const hostLink = (
      <NamedLink
        className={css.authorNameLink}
        name="ListingPage"
        params={params}
        to={{ hash: '#host' }}
      >
        {authorDisplayName}
      </NamedLink>
    );

    const category =
      publicData && publicData.category ? (
        <span>
          {categoryLabel(categoriesConfig, publicData.category)}
          <span className={css.separator}>•</span>
        </span>
      ) : null;
/*
const tracking = listingId.uuid === "5bfc352a-ffd0-438e-955f-8e4046bb9d93" ?
(
 <script type="text/javascript" src="https://next-dexem.netdna-ssl.com/dni_scripts/94645320-280c-0135-3c70-723c91a8b9e5/dni.js"></script>
    
) : null;
*/
    return (
      <Page
        title={schemaTitle}
        scrollingDisabled={scrollingDisabled}
        author={authorDisplayName}
        contentType="website"
        description={description}
        facebookImages={facebookImages}
        twitterImages={twitterImages}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'ItemPage',
          description: description,
          name: schemaTitle,
          image: schemaImages,
        }}
      >
        <LayoutSingleColumn className={css.pageRoot}>
          <LayoutWrapperTopbar>{topbar}</LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div>
              <SectionImages
                title={title}
                listing={currentListing}
                isOwnListing={isOwnListing}
                editParams={{
                  id: listingId.uuid,
                  slug: listingSlug,
                  type: 'edit',
                  tab: 'description',
                }}
                imageCarouselOpen={this.state.imageCarouselOpen}
                onImageCarouselClose={() => this.setState({ imageCarouselOpen: false })}
                handleViewPhotosClick={handleViewPhotosClick}
                onManageDisableScrolling={onManageDisableScrolling}
              />
              
                <div className={css.contentContainer}>
                <SectionAvatar user={currentAuthor} params={params} />
                <div className={css.mainContent}>
                  <SectionHeading
                 //   priceTitle={priceTitle}
                 //   formattedPrice={formattedPrice}
                    richTitle={richTitle}
                    category={category}
                    hostLink={hostLink}
                    showContactUser={showContactUser}
                    onContactUser={this.onContactUser}
                  />
                 
                  <SectionDescription description={description} />
                   <SectionRulesMaybe publicData={publicData} />
                  <SectionFeatures
                    options={amenitiesConfig}
                    selectedOptions={publicData.amenities}
                  />
                   <SectionSession  publicData={publicData} />
                  <SectionMapMaybe
                    geolocation={geolocation}
                    publicData={publicData}
                    listingId={currentListing.id}
                  />
                  <SectionReviews reviews={reviews} fetchReviewsError={fetchReviewsError} />
                  <SectionHost
                    title={title}
                    listing={currentListing}
                    authorDisplayName={authorDisplayName}
                    onContactUser={this.onContactUser}
                    isEnquiryModalOpen={this.state.enquiryModalOpen}
                    isBooking={this.state.isBooking}
                    BookingInfo={this.state.BookingInfo}
                    BookingValues={this.state.BookingValues}
                    onCloseEnquiryModal={() => this.setState({ enquiryModalOpen: false, isBooking: false})}
                    sendEnquiryError={sendEnquiryError}
                    sendEnquiryInProgress={sendEnquiryInProgress}
                    onSubmitEnquiry={this.onSubmitEnquiry}
                    currentUser={currentUser}
                    onManageDisableScrolling={onManageDisableScrolling}
                  />
                   </div>
                  <SectionBooking
                  listingId={currentListing.id}
                  isOwnListing={isOwnListing}
                  isClosed={isClosed}
                  isBook={isBook}
                  duration_hours={duration_hours}
                  duration_minutes={duration_minutes}
                  unitType={unitType}
                  price={price}
                  phone ={currentListing.attributes.publicData.phone}
                  formattedPrice={formattedPrice}
                  priceTitle={priceTitle}
                  handleBookingSubmit={handleBookingSubmit}
                  richTitle={title}
                  authorDisplayName={authorDisplayName}
                  handleBookButtonClick={handleBookButtonClick}
                  handleMobileBookModalClose={handleMobileBookModalClose}
                  onManageDisableScrolling={onManageDisableScrolling}
                  timeSlots={timeSlots}
                  fetchTimeSlotsError={fetchTimeSlotsError}
                /> 
               

              </div>
            </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
       
      </Page>

    );
  }
}

ListingPageComponent.defaultProps = {
  unitType: config.bookingUnitType,
  currentUser: null,
  enquiryModalOpenForListingId: null,
  showListingError: null,
  reviews: [],
  fetchReviewsError: null,
  timeSlots: null,
  fetchTimeSlotsError: null,
  sendEnquiryError: null,
  categoriesConfig: config.custom.categories,
  amenitiesConfig: config.custom.amenities,
};

ListingPageComponent.propTypes = {
  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
  location: shape({
    search: string,
  }).isRequired,

  unitType: propTypes.bookingUnitType,
  // from injectIntl
  intl: intlShape.isRequired,

  params: shape({
    id: string.isRequired,
    slug: string,
    variant: oneOf([LISTING_PAGE_PENDING_APPROVAL_VARIANT]),
  }).isRequired,

  isAuthenticated: bool.isRequired,
  currentUser: propTypes.currentUser,
  getListing: func.isRequired,
  getOwnListing: func.isRequired,
  onManageDisableScrolling: func.isRequired,
  scrollingDisabled: bool.isRequired,
  enquiryModalOpenForListingId: string,
  showListingError: propTypes.error,
  useInitialValues: func.isRequired,
  reviews: arrayOf(propTypes.review),
  fetchReviewsError: propTypes.error,
  timeSlots: arrayOf(propTypes.timeSlot),
  fetchTimeSlotsError: propTypes.error,
  sendEnquiryInProgress: bool.isRequired,
  sendEnquiryError: propTypes.error,
  submitSignup: func.isRequired,
  onSendEnquiry: func.isRequired,

  sendOrderRequest: func.isRequired,
  onCreateAvailabilityException: func.isRequired,

  categoriesConfig: array,
  amenitiesConfig: array,
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.Auth;
  const {
    showListingError,
    reviews,
    fetchReviewsError,
    timeSlots,
    fetchTimeSlotsError,
    sendEnquiryInProgress,
    sendEnquiryError,
    enquiryModalOpenForListingId,
  } = state.ListingPage;
  const { currentUser } = state.user;

  const getListing = id => {
    const ref = { id, type: 'listing' };
    const listings = getMarketplaceEntities(state, [ref]);
    return listings.length === 1 ? listings[0] : null;
  };

  const getOwnListing = id => {
    const ref = { id, type: 'ownListing' };
    const listings = getMarketplaceEntities(state, [ref]);
    return listings.length === 1 ? listings[0] : null;
  };

  return {
    isAuthenticated,
    currentUser,
    getListing,
    getOwnListing,
    scrollingDisabled: isScrollingDisabled(state),
    enquiryModalOpenForListingId,
    showListingError,
    reviews,
    fetchReviewsError,
    timeSlots,
    fetchTimeSlotsError,
    sendEnquiryInProgress,
    sendEnquiryError,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
  dispatch(manageDisableScrolling(componentId, disableScrolling)),
  useInitialValues: (setInitialValues, values) => dispatch(setInitialValues(values)),
  onSendEnquiry: (listingId, message) => dispatch(sendEnquiry(listingId, message)),
  submitSignup: params => dispatch(signup(params)),
  sendOrderRequest: (params, initialMessage) => dispatch(initiateOrder(params, initialMessage)),

  onCreateAvailabilityException: params => dispatch(requestCreateAvailabilityException(params)),

});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const ListingPage = compose(withRouter, connect(mapStateToProps, mapDispatchToProps), injectIntl)(
  ListingPageComponent
);

ListingPage.setInitialValues = initialValues => setInitialValues(initialValues);
ListingPage.loadData = loadData;

export default ListingPage;
