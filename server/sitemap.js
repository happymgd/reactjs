const path = require('path');
const moment = require('moment');

const buildPath = path.resolve(__dirname, '..', 'build');
const PORT = parseInt(process.env.PORT, 10);
const USING_SSL = process.env.REACT_APP_SHARETRIBE_USING_SSL === 'true';

/**
 * Resolves domain and port information from
 * a URL, for example:
 * https://example.com:8080 => example.com:8080
 */
const domainAndPort = rootURL => {
  if (rootURL.indexOf('//') === -1) {
    return rootURL;
  } else {
    return rootURL.split('//')[1];
  }
};

/**
 * Resolves the domain from a URL, for example:
 * https://example.com:8080 => example.com
 */
const domain = rootURL => {
  if (!rootURL) {
    return 'INVALID_URL';
  }

  return domainAndPort(rootURL).split(':')[0];
};

/**
 * Resolves the port number from a URL. If the port
 * can not be found `undefined` will be returned.
 */
const port = rootURL => {
  if (!rootURL) {
    return 'INVALID_URL';
  }

  return domainAndPort(rootURL).split(':')[1];
};

/**
 * Return a structure for sitemap.xml and robots.txt to be used by the
 * express-sitemap library. Uses the canonical URL value from env
 * config for domain and port information.
 */
exports.sitemapStructure = () => {
  const now = moment().format('YYYY-MM-DD');

  return {
    url: domain(process.env.REACT_APP_CANONICAL_ROOT_URL),
    http: USING_SSL ? 'https' : 'http',
    port: port(process.env.REACT_APP_CANONICAL_ROOT_URL),
    sitemap: path.join(buildPath, 'static', 'sitemap.xml'),
    robots: path.join(buildPath, 'robots.txt'),
    sitemapSubmission: '/static/sitemap.xml',
    map: {
      '/': ['get'],
      '/#/signup': ['get'],
      '/#/login': ['get'],
      '/#/praticiens': ['get'],
      '/#/s?address=Paris%2C%20France&bounds=49%2C2.7%2C48.6%2C2': [
        'get',
      ],
      '/#/s?address=Lille%2C%20France&bounds=50.8%2C3.4%2C50.4%2C2.6': [
        'get',
      ],
      '/#/s?address=Charleroi%2C%20Belgique&bounds=50.6%2C4.7%2C50.2%2C4.1': [
        'get',
      ],
      '/#/l/perte-de-poids-grace-a-l-hypnotherapie/5c377c8f-ca3d-4dda-837e-a9ac4d3ffb3b': [
        'get',
      ],
      '/#/l/arreter-les-achats-compulsifs-grace-a-l-hypnotherapie/5c34e002-b5fa-4859-b1cd-91888399f67d': [
        'get',
      ],
      '/#/l/arret-de-l-alcool/5c34d00a-a7a1-4260-9217-a3eec63e471a': [
        'get',
      ],
      '/#/l/arretez-de-fumer-grace-a-l-hypnotherapie/5bfc352a-ffd0-438e-955f-8e4046bb9d93': [
        'get',
      ],
      '/#/l/soigner-le-stress-et-l-anxiete-grace-a-l-hypnotherapie/5bfc3036-3ec7-44d1-a47e-7d19c6f56e61': [
        'get',
      ],
      '/#/l/hypnotherapie-regime-a-lille/5c388534-8e81-47df-9b7f-c9ad450cff11': [
        'get',
      ],
      '/#/l/hypnotherapie-arret-du-tabac-a-lille/5c3883a3-26dd-4af1-86c7-c542cafc0a1b': [
        'get',
      ],
      '/#/l/traitez-les-achats-compulsifs-avec-l-hypnotherapie/5c34cbdf-70fb-4e88-b92e-fe7e01e5f957': [
        'get',
      ],
      '/#/l/soigner-le-stress-et-l-anxiete-grace-a-l-hypnotherapie/5c3cb41c-826e-4b04-bdc2-7571bf9de23e': [
        'get',
      ],
      '/#/l/maigrir-grace-a-l-hypnotherapie/5c3cb136-94f6-46b9-92de-c5d849a32471': [
        'get',
      ],
      '/#/l/soigner-les-achats-compulsifs-grace-a-l-hypnotherapie/5c3caf65-112f-49f7-b337-c8ece37d1ea7': [
        'get',
      ],
      '/#/l/soigner-l-addiction-au-tabac-grace-a-l-hypnotherapie/5c3caeb6-fdec-402c-a6ce-90ce0e21e263': [
        'get',
      ],
      '/#/account': ['get'],
      '/#/reset-password': ['get'],
      '/#/verify-email': ['get'],
    },
    route: {
      '/': {
        lastmod: now,
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/signup': {
        lastmod: now,
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/login': {
        lastmod: now,
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/praticiens': {
        lastmod: now,
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/s?address=Paris%2C%20France&bounds=49%2C2.7%2C48.6%2C2': {
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/s?address=Lille%2C%20France&bounds=50.8%2C3.4%2C50.4%2C2.6': {
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/s?address=Charleroi%2C%20Belgique&bounds=50.6%2C4.7%2C50.2%2C4.1': {
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/l/perte-de-poids-grace-a-l-hypnotherapie/5c377c8f-ca3d-4dda-837e-a9ac4d3ffb3b': {
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/l/arreter-les-achats-compulsifs-grace-a-l-hypnotherapie/5c34e002-b5fa-4859-b1cd-91888399f67d': {
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/l/arret-de-l-alcool/5c34d00a-a7a1-4260-9217-a3eec63e471a': {
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/l/arretez-de-fumer-grace-a-l-hypnotherapie/5bfc352a-ffd0-438e-955f-8e4046bb9d93': {
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/l/soigner-le-stress-et-l-anxiete-grace-a-l-hypnotherapie/5bfc3036-3ec7-44d1-a47e-7d19c6f56e61': {
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/l/hypnotherapie-regime-a-lille/5c388534-8e81-47df-9b7f-c9ad450cff11': {
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/l/hypnotherapie-arret-du-tabac-a-lille/5c3883a3-26dd-4af1-86c7-c542cafc0a1b': {
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/l/traitez-les-achats-compulsifs-avec-l-hypnotherapie/5c34cbdf-70fb-4e88-b92e-fe7e01e5f957': {
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/l/soigner-le-stress-et-l-anxiete-grace-a-l-hypnotherapie/5c3cb41c-826e-4b04-bdc2-7571bf9de23e': {
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/l/maigrir-grace-a-l-hypnotherapie/5c3cb136-94f6-46b9-92de-c5d849a32471': {
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/l/soigner-les-achats-compulsifs-grace-a-l-hypnotherapie/5c3caf65-112f-49f7-b337-c8ece37d1ea7': {
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/l/soigner-l-addiction-au-tabac-grace-a-l-hypnotherapie/5c3caeb6-fdec-402c-a6ce-90ce0e21e263': {
        changefreq: 'always',
        priority: 1.0,
      },
      '/#/account': {
        disallow: true,
      },
      '/#/reset-password': {
        disallow: true,
      },
      '/#/verify-email': {
        disallow: true,
      },
    },
  };
};
