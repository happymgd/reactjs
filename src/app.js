import React from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';

// react-dates needs to be initialized before using any react-dates component
// https://github.com/airbnb/react-dates#initialize
// NOTE: Initializing it here will initialize it also for app.test.js
import 'react-dates/initialize';
import Helmet from 'react-helmet';
import { HashRouter, StaticRouter } from 'react-router-dom';
//import { HashRouter, StaticRouter,BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import mapValues from 'lodash/mapValues';
import moment from 'moment';
import { IntlProvider, addLocaleData } from 'react-intl';
import configureStore from './store';
import routeConfiguration from './routeConfiguration';
import Routes from './Routes';
import config from './config';

// If you want to change the language, Change the imports to the match
// the wanted locale.
//
// Remember to also change the language in the config.js file.
import localeData from 'react-intl/locale-data/fr';
import messages from './translations/fr.json';

import ReactGA from 'react-ga';
//import ReactPixel from 'react-facebook-pixel';
import { hotjar } from 'react-hotjar';

const isTestEnv = process.env.NODE_ENV === 'test';

// Locale should not affect the tests. We ensure this by providing
// messages with the key as the value of each message.
const testMessages = mapValues(messages, (val, key) => key);
const localeMessages = isTestEnv ? testMessages : messages;

// google analytics

ReactGA.initialize('UA-129118678-1');
ReactGA.ga('send', 'pageview', '/');
ReactGA.ga('send', 'pageview', '/#/praticiens');
ReactGA.ga('send', 'pageview', '/#/signup');
ReactGA.ga('send', 'pageview', '/#/login');

ReactGA.ga('send', 'pageview', '/#/s?address=Charleroi%2C%20Belgique&bounds=50.6%2C4.7%2C50.2%2C4.1');
ReactGA.ga('send', 'pageview', '/#/l/perte-de-poids-grace-a-l-hypnotherapie/5c377c8f-ca3d-4dda-837e-a9ac4d3ffb3b');
ReactGA.ga('send', 'pageview', '/#/l/arreter-les-achats-compulsifs-grace-a-l-hypnotherapie/5c34e002-b5fa-4859-b1cd-91888399f67d');
ReactGA.ga('send', 'pageview', '/#/l/arret-de-l-alcool/5c34d00a-a7a1-4260-9217-a3eec63e471a');
ReactGA.ga('send', 'pageview', '/#/l/arretez-de-fumer-grace-a-l-hypnotherapie/5bfc352a-ffd0-438e-955f-8e4046bb9d93');
ReactGA.ga('send', 'pageview', '/#/l/soigner-le-stress-et-l-anxiete-grace-a-l-hypnotherapie/5bfc3036-3ec7-44d1-a47e-7d19c6f56e61');

ReactGA.ga('send', 'pageview', '/#/s?address=Lille%2C%20France&bounds=50.8%2C3.4%2C50.4%2C2.6');
ReactGA.ga('send', 'pageview', '/#/l/hypnotherapie-regime-a-lille/5c388534-8e81-47df-9b7f-c9ad450cff11');
ReactGA.ga('send', 'pageview', '/#/l/hypnotherapie-arret-du-tabac-a-lille/5c3883a3-26dd-4af1-86c7-c542cafc0a1b');
ReactGA.ga('send', 'pageview', '/#/l/traitez-les-achats-compulsifs-avec-l-hypnotherapie/5c34cbdf-70fb-4e88-b92e-fe7e01e5f957');

ReactGA.ga('send', 'pageview', '/#/s?address=Paris%2C%20France&bounds=49%2C2.7%2C48.6%2C2');
ReactGA.ga('send', 'pageview', '/#/l/soigner-le-stress-et-l-anxiete-grace-a-l-hypnotherapie/5c3cb41c-826e-4b04-bdc2-7571bf9de23e');
ReactGA.ga('send', 'pageview', '/#/l/maigrir-grace-a-l-hypnotherapie/5c3cb136-94f6-46b9-92de-c5d849a32471');
ReactGA.ga('send', 'pageview', '/#/l/soigner-les-achats-compulsifs-grace-a-l-hypnotherapie/5c3caf65-112f-49f7-b337-c8ece37d1ea7');
ReactGA.ga('send', 'pageview', '/#/l/soigner-l-addiction-au-tabac-grace-a-l-hypnotherapie/5c3caeb6-fdec-402c-a6ce-90ce0e21e263');


// end google analytics

// facebook pixel

//ReactPixel.init('342177766614650');
//ReactPixel.pageView(); 
//ReactPixel.track('Lead');

// end facebook pixel

// hotjar

hotjar.initialize(1170251, 6);

// end hotjar



const setupLocale = () => {
  if (isTestEnv) {
    // Don't change the locale in tests
    return;
  }

  // Add the translation messages
  addLocaleData([...localeData]);

  // Set the Moment locale globally
  // See: http://momentjs.com/docs/#/i18n/changing-locale/
  moment.locale(config.locale);
};

export const ClientApp = props => {
  const { store } = props;
  setupLocale();
  return (
    <IntlProvider locale={config.locale} messages={localeMessages}>
      <Provider store={store}>
        <HashRouter>
          <Routes routes={routeConfiguration()} />
        </HashRouter>
      </Provider>
    </IntlProvider>
  );
};

const { any, string } = PropTypes;

ClientApp.propTypes = { store: any.isRequired };

export const ServerApp = props => {
  const { url, context, store } = props;
  setupLocale();
  return (
    <IntlProvider locale={config.locale} messages={localeMessages}>
      <Provider store={store}>
        <StaticRouter location={url} context={context}>
          <Routes routes={routeConfiguration()} />
        </StaticRouter>
      </Provider>
    </IntlProvider>
  );
};

ServerApp.propTypes = { url: string.isRequired, context: any.isRequired, store: any.isRequired };

/**
 * Render the given route.
 *
 * @param {String} url Path to render
 * @param {Object} serverContext Server rendering context from react-router
 *
 * @returns {Object} Object with keys:
 *  - {String} body: Rendered application body of the given route
 *  - {Object} head: Application head metadata from react-helmet
 */
export const renderApp = (url, serverContext, preloadedState) => {
  // Don't pass an SDK instance since we're only rendering the
  // component tree with the preloaded store state and components
  // shouldn't do any SDK calls in the (server) rendering lifecycle.
  const store = configureStore(preloadedState);

  const body = ReactDOMServer.renderToString(
    <ServerApp url={url} context={serverContext} store={store} />
  );
  const head = Helmet.renderStatic();
  return { head, body };
};
