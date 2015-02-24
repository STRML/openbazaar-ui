'use strict';

/**
 * Container for all messages to be shown to the user.
 * @param {String} locale Locale to initialize the app with. Default: 'EN-US'.
 *
 * FIXME use `react-intl` instead? https://github.com/yahoo/react-intl/
 */
var Messages = module.exports = (locale) => {
  var en_us = {
    foo: `bar`,
    titles: {
      '/': `OpenBazaar Home`
    }
  };
    
  // Add Locales here.
  if (locale === 'EN-US') {
    return en_us;
  } else {
    return en_us;
  }
};
