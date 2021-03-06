/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/events', require('./api/log-event'));
  app.use('/api/babies', require('./api/baby'));
  app.use('/api/feeders', require('./api/feeder'));
  app.use('/api/food-types', require('./api/food-type'));
  app.use('/api/time-logs', require('./api/time-log'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
