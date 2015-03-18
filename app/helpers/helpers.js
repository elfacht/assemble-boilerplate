module.exports.register = function (Handlebars, options) {
  Handlebars.registerHelper('dataPath', function ( child, options ) {
    if ( typeof child !== 'object' ) {
      return '';
    }
    child['dataPath_'] = this;
    return options.fn( child );
  });
};
